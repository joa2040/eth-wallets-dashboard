export interface  Wallet {
  id?: string,
  address: string,
  balance: string,
  starred: boolean,
  user: string,
  isOld?: boolean,
  firstTransaction?: number,
  position?: number
}
