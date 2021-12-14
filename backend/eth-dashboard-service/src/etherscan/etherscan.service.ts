import { Injectable } from "@nestjs/common";
import config from "config";
import { BigNumber, ethers } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";

const ETHERSCAN_NETWORK = config.get("etherscan.network");
const ETHERSCAN_API_KEY = config.get("etherscan.apiKey");

const provider = new ethers.providers.EtherscanProvider(
  ETHERSCAN_NETWORK, ETHERSCAN_API_KEY
);

/**
 * Proxy service to etherscan API
 *
 * For this implementation I decided to use ethers library, but I could also have used the API instead like this:
 *
 * const url = `${ETHERSCAN_NETWORK}api?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
 * const { data } = await axios.get<EtherscanSingleBalanceResponse>(url);
 * if (data.status !== "1") {
 *      logger.error(`Etherscan failed ${data.message}`);
 *      throw new Error(data.message);
 *    }
 * return data;
 */
@Injectable()
export class EtherscanService {

  /**
   * Return information account for the address parameter
   *
   * @param address
   * @return Promise<EtherscanSingleBalanceResponse>
   */
  async getBalance(address: string): Promise<BigNumber> {
    return provider.getBalance(address);
  }

  /**
   * Return information account for the address parameter
   *
   * @param address
   * @return Promise<Array<TransactionResponse>>
   */
  async getHistory(address: string): Promise<Array<TransactionResponse>> {
    return provider.getHistory(address);
  }

  /**
   * Helper to convert from wei to ether
   *
   * @param balance
   */
  formatEther(balance: BigNumber) {
    return ethers.utils.formatEther(balance)
  }

}
