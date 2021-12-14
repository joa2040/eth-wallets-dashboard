import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { Wallet } from "./interfaces/wallet.interface";
import logger from "lambda-log";

/**
 * This controller handles basic operations for wallets
 */
@Controller("/wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /**
   * Post method to create a new wallet
   *
   * @param wallet
   * @return Promise<Wallet>
   */
  @Post()
  async addWallet(@Body() wallet: Wallet): Promise<Wallet> {
    if (!wallet.address) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "You must provide a wallet address"
      }, HttpStatus.BAD_REQUEST);
    }

    const existedWallet = await this.walletService.findWallet(wallet);
    if (existedWallet && existedWallet.address) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Wallet already exists"
      }, HttpStatus.BAD_REQUEST);
    }

    logger.info(`Saving wallet with address ${wallet.address}`);
    try {
      return this.walletService.addWallet(wallet);
    } catch (e) {
      logger.error(e);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Unexpected error, please check wallet address"
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Put method to update wallet list
   *
   * @param wallets[]
   * @return Promise<Wallet>
   */
  @Put()
  async saveWallets(@Body() wallets: Wallet[]): Promise<void> {
    logger.info(`Updating wallets...`);
    try {
      await this.walletService.updateAll(wallets);
    } catch (e) {
      logger.error(e);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Unexpected error, please try again later"
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get method to load wallets by user
   *
   * @param user
   * @return Promise<Wallet[]>
   */
  @Get("/:user")
  async getWallets(@Param('user') user): Promise<Wallet[]> {
    logger.info(`Getting wallets for user ${user}`);
    try {
      return this.walletService.loadWalletsByUser(user);
    } catch (e) {
      logger.error(e);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Unexpected error, please try again later"
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
