import moment from "moment";

export const isWalletOld = (timestamp: number): boolean => {
  if (!timestamp) {
    return false;
  }
  const now = moment();
  const date = moment.unix(timestamp);
  return now.diff(date, 'days') > 365;
}
