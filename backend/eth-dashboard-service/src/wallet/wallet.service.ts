import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Wallet } from "./interfaces/wallet.interface";
import { EtherscanService } from "../etherscan/etherscan.service";
import { DynamoDB } from "aws-sdk";
import config from "../../config";
import logger from "lambda-log";
import { ScanOutput } from "aws-sdk/clients/dynamodb";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import ScanInput = DocumentClient.ScanInput;
import { isWalletOld } from "./utils";

const dynamoDB = new DynamoDB.DocumentClient();
const WALLETS_TABLE_NAME = config.get("database.tables.wallets");

/**
 * Wallet business logic
 */
@Injectable()
export class WalletService {
  constructor(private readonly etherscanService: EtherscanService) {}

  /**
   * Add a new wallet
   *
   * @param wallet
   * @return Promise<Wallet>
   */
  async addWallet(wallet: Wallet): Promise<Wallet> {
    wallet.id = uuid();
    wallet.starred = false;

    const transactions = await this.etherscanService.getHistory(wallet.address);

    if (transactions && transactions[0]) {
      const firstTransaction = transactions[0];
      wallet.firstTransaction = firstTransaction.timestamp;
    }

    try {
      await dynamoDB
        .put({
          TableName: WALLETS_TABLE_NAME,
          Item: wallet
        }).promise();

      return wallet;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Find a wallet by address
   *
   * @param wallet
   * @return Promise<Wallet> | null
   */
  async findWallet(wallet: Wallet): Promise<Wallet | null> {
    const params = {
      TableName: WALLETS_TABLE_NAME,
      Key: {
        "address": wallet.address,
        "user": wallet.user
      }
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item as Wallet;
  }

  /**
   * Load user wallets
   *
   * @param user
   * @return Promise<Wallet> | null
   */
  async loadWalletsByUser(user: string): Promise<Wallet[]> {
    const params: ScanInput = {
      TableName: WALLETS_TABLE_NAME,
      FilterExpression: "#user = :user",
      ExpressionAttributeNames: { "#user": "user" },
      ExpressionAttributeValues: { ":user": user }
    };

    let wallets = [];
    let items: ScanOutput;

    do {
      items = await dynamoDB.scan(params).promise();
      items.Items.forEach((item) => wallets.push(<unknown>item as Wallet));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    const decorateWallets = wallets.map(async wallet => {
      wallet.isOld = isWalletOld(wallet.firstTransaction);
      wallet.balance = this.etherscanService.formatEther(await this.etherscanService.getBalance(wallet.address));
    })
    await Promise.all(decorateWallets);
    return wallets;
  }

  /**
   * Update all wallets for a user
   *
   * @param wallets[]
   * @return Promise<Wallet> | null
   */
  async updateAll(wallets: Wallet[]): Promise<void> {
    const params = wallets.map(wallet => {
      return {
        Put: {
          Item: wallet,
          TableName: WALLETS_TABLE_NAME
        }
      };
    });
    await dynamoDB.transactWrite({ TransactItems: params }).promise();
  }
}
