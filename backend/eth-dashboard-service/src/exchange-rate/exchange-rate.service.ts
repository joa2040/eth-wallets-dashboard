import { Injectable } from "@nestjs/common";
import config from "../../config";
import { DynamoDB } from "aws-sdk";
import { ExchangeRate } from "./interfaces/exchangeRate.interface";
import { CurrencyService } from "../currency/currency.service";


const dynamoDB = new DynamoDB.DocumentClient();
const EXCHANGE_RATES_TABLE_NAME = config.get("database.tables.exchangeRates");

/**
 * Exchange Rate business logic
 */
@Injectable()
export class ExchangeRateService {
  constructor(private readonly currencyService: CurrencyService) {
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
    const currencies = await this.currencyService.getCurrencies();

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
    const nonNullResults = results.filter(result => result.Item);
    return nonNullResults.map(result => result.Item as ExchangeRate);
  }
}
