import { Injectable } from '@nestjs/common';
import config from "../config";
import { EtherscanService } from "./etherscan/etherscan.service";
import { ethers } from "ethers";

@Injectable()
export class AppService {
  constructor(private readonly etherscanService: EtherscanService) {}

  async getHello(): Promise<string> {
    const balance = await this.etherscanService.getBalance('0x63a9975ba31b0b9626b34300f7f627147df1f526')
    console.log('xxxxxx', ethers.utils.formatEther(balance));
    return 'Hello World!';
  }

  async getBye(): Promise<string> {
    const transactions = await this.etherscanService.getHistory('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
    const firstTransaction = new Date(transactions[0].timestamp * 1000);
    console.log(transactions.length, firstTransaction,
    new Date(transactions[1].timestamp * 1000))
    console.log(firstTransaction);
    return 'Hello Bye!';
  }
}
