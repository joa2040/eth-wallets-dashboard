import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ExchangeRate } from "./interfaces/exchangeRate.interface";
import { ExchangeRateService } from "./exchange-rate.service";
import logger from "lambda-log";

@Controller("exchange-rate")
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {
  }

  /**
   * Post method to save exchange rates
   *
   * @param exchangeRates
   * @return Promise<void>
   */
  @Post()
  async saveExchangeRates(@Body() exchangeRates: ExchangeRate[]): Promise<void> {

    logger.info(`Saving exchange rates`);
    try {
      return this.exchangeRateService.saveExchangeRates(exchangeRates);
    } catch (e) {
      logger.error(e);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Unexpected error, please check wallet address"
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get method to load exchange rates by user
   *
   * @param user
   * @return Promise<ExchangeRate>
   */
  @Get("/:user")
  async loadExchangeRates(@Param("user") user): Promise<ExchangeRate[]> {
    logger.info(`Getting wallets for user ${user}`);
    try {
      return this.exchangeRateService.loadExchangeRates(user);
    } catch (e) {
      logger.error(e);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Unexpected error, please try again later"
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
