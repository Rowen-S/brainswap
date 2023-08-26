import { constructSameAddressMap } from '../utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')

export const IQ_ADDRESS = constructSameAddressMap('0xB2F0b8ff91336DbC074CDc34Db6C19EA7df9F30a')
export const MULTICALL_ADDRESSES = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
  [84531]: '0xa5D7b84358B979949F850eDF77FcFDf5d5848602',
}
export const V2_ROUTER_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x0a8746e1ab19888f5671511f538aaf0ca935d4a7'),
  [80001]: '0xeCf0FB249F7FE90e2B882341d9Ad83E05b8cb0DD',
}
export const GOVERNANCE_ADDRESS: AddressMap = constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F')
export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')
export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [1]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [1]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6')

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [1]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  // Mod
  [84531]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [1]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const IDO_ADDRESS: AddressMap = {
  [80001]: '0x0992F647ea3fa1E148cC6326D9991510D6A07098',
}

export const ES_TOKEN_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x124a8F7dFD98D54b34c6dCa137f0901fcCbC4f63'),
}

export const DROP_ADDRESS: AddressMap = constructSameAddressMap('0xb19EA693C1A977fbc17e95dd5cEFC6b926514F63')
