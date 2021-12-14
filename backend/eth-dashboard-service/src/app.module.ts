import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtherscanService } from './etherscan/etherscan.service';
import { WalletController } from "./wallet/wallet.controller";
import { WalletService } from "./wallet/wallet.service";
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';

@Module({
  controllers: [AppController, WalletController, ExchangeRateController],
  providers: [AppService, EtherscanService, WalletService, ExchangeRateService],
})
export class AppModule {}
