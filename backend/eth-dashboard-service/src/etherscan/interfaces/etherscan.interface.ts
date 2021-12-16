export interface EtherscanTransactionsResponse {
  status: string,
  message: string,
  result: Transaction[]
}

export interface Transaction {
  blockNumner: string,
  timeStamp: string,
  hash: string,
  from: string,
  to: string,
}
