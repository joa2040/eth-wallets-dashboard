import { Module } from '@nestjs/common';
import { EtherscanService } from './etherscan/etherscan.service';
import { WalletController } from "./wallet/wallet.controller";
import { WalletService } from "./wallet/wallet.service";
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyService } from './currency/currency.service';

@Module({
  controllers: [WalletController, ExchangeRateController, CurrencyController],
  providers: [EtherscanService, WalletService, ExchangeRateService, CurrencyService],
})
export class AppModule {}
