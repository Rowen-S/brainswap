export function constructSameAddressMap<T extends string>(address: T): { [chainId: number]: T } {
  return {
    [1]: address,
    [80001]: address,
    [84531]: address,
  }
}
