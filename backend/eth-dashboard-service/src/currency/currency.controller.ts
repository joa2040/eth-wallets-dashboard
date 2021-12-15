import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import logger from "lambda-log";
import { CurrencyService } from "./currency.service";
import { Currency } from "./interfaces/currency.interface";

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {
  }

  /**
   * Get method to load currencies
   *
   * @return Promise<Currency>
   */
  @Get()
  async loadCurrencies(): Promise<Currency[]> {
    logger.info(`Getting currencies...`);
    try {
      return this.currencyService.getCurrencies();
    } catch (e) {
      logger.error(e);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Unexpected error, please try again later"
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
