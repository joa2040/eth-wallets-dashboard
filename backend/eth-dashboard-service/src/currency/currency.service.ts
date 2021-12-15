import { Injectable } from '@nestjs/common';
import { Currency } from "./interfaces/currency.interface";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { Wallet } from "../wallet/interfaces/wallet.interface";
import config from "../../config";
import { DynamoDB } from "aws-sdk";

const CURRENCIES_TABLE_NAME = config.get("database.tables.currencies");
const dynamoDB = new DynamoDB.DocumentClient();

@Injectable()
export class CurrencyService {

  /**
   * Return all available currencies e.g USD, EUR
   */
  async getCurrencies(): Promise<Currency[]> {
    const params: DocumentClient.ScanInput = {
      TableName: CURRENCIES_TABLE_NAME
    };
    let currencies = [];
    let items: DocumentClient.ScanOutput;

    do {
      items = await dynamoDB.scan(params).promise();
      items.Items.forEach((item) => currencies.push(<unknown>item as Wallet));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return currencies;
  }
}
