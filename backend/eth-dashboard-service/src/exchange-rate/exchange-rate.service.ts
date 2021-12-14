import { Injectable, InternalServerErrorException } from "@nestjs/common";
import config from "../../config";
import { DynamoDB } from "aws-sdk";
import { Wallet } from "../wallet/interfaces/wallet.interface";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { Currency, ExchangeRate } from "./interfaces/exchangeRate.interface";


const dynamoDB = new DynamoDB.DocumentClient();
const CURRENCIES_TABLE_NAME = config.get("database.tables.currencies");
const EXCHANGE_RATES_TABLE_NAME = config.get("database.tables.exchangeRates");

/**
 * Exchange Rate business logic
 */
@Injectable()
export class ExchangeRateService {

  /**
   * Return all available currencies e.g USD, EUR
   */
  async getCurrencies(): Promise<Currency[]> {
    const params: DocumentClient.ScanInput = {
      TableName: CURRENCIES_TABLE_NAME
    }
    let currencies = [];
    let items: DocumentClient.ScanOutput;

    do {
      items = await dynamoDB.scan(params).promise();
      items.Items.forEach((item) => currencies.push(<unknown>item as Wallet));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return currencies;
  }

  /**
   * Save exchange rates
   *
   * @param exchangeRates
   */
  async saveExchangeRates(exchangeRates: ExchangeRate[]) {
    const params = exchangeRates.map(exchangeRate => {
      return {
        Put: {
          Item: exchangeRate,
          TableName: EXCHANGE_RATES_TABLE_NAME
        }
      };
    });
    await dynamoDB.transactWrite({ TransactItems: params }).promise();
  }

  /**
   * Load exchange rates by user
   *
   * @param exchangeRates
   */
  async loadExchangeRates(user: string): Promise<ExchangeRate[]> {
    const currencies = await this.getCurrencies();

    const exchangeRatesPromises = currencies.map(currency => {
      const params = {
        TableName: EXCHANGE_RATES_TABLE_NAME,
        Key: {
          "user": user,
          "currency": currency.currency
        }
      };
      return dynamoDB.get(params);
    });

    const results = await Promise.all(exchangeRatesPromises.map(promise => promise.promise()));
    return results.map( result => result.Item as ExchangeRate);
  }
}
