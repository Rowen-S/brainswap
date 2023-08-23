import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { DateTime } from 'luxon'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk/dist/'
import { TokenAddressMap } from '../state/lists/hooks'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenString(text: string, chars = 6): string {
  return `${text.substring(0, chars + 2)}...${text.substring(text.length - chars)}`
}

export function formatLuxonDateTime(timestampString: string, targetZone = 'UTC') {
  const timestamp = parseInt(timestampString, 10)
  const dateTime = DateTime.fromSeconds(timestamp)

  const formattedTime = dateTime.setZone(targetZone).toISO()

  return formattedTime
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(tokenAddressMap: TokenAddressMap, token?: Token): boolean {
  return Boolean(token?.isToken && tokenAddressMap[token.chainId]?.[token.address])
}

export function formattedFeeAmount(feeAmount: FeeAmount): number {
  return feeAmount / 10000
}

export function formatToFixed(amount: string | number, place = 2): string {
  amount = amount
  if (typeof amount == 'string') {
    amount = parseFloat(amount)
  }
  return formatWithMod(parseFloat(amount.toFixed(place)))
}
export function formatWithMod(amount: number): string {
  let n = amount
  let r = ''
  let temp = ''
  let mod: number

  do {
    // Calculate the remainder for the high three digits
    mod = n % 1000
    // Determine if the value is greater than 1, which is the condition to continue
    n = n / 1000
    // Get the high three digits
    temp = ~~mod + ''
    // 1. Padding: If n > 1, we need to pad the digits, e.g., 1 => 001
    // Otherwise, when temp = ~~mod, 1 001 will become "11"
    // 2. Concatenate ","
    r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '')
  } while (n >= 1)

  const strNumber = amount + ''
  const index = strNumber.indexOf('.')

  // Concatenate the decimal part
  if (index >= 0) {
    r += strNumber.substring(index)
  }

  return r
}
