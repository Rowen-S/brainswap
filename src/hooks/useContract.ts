import { Contract } from '@ethersproject/contracts'
import { WETH9 } from '@uniswap/sdk-core'
import { abi as GOVERNANCE_ABI } from '@uniswap/governance/build/GovernorAlpha.json'
import { abi as UNI_ABI } from '@uniswap/governance/build/Uni.json'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { abi as MERKLE_DISTRIBUTOR_ABI } from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'

import IUniswapV2Router02ABI from 'abis/IUniswapV2Router02.json'
import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import ERC20_ABI from 'abis/erc20.json'
import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import { abi as MulticallABI } from 'abis/UniswapInterfaceMulticall.json'

import { Unisocks } from 'abis/types/Unisocks'
import UNISOCKS_ABI from 'abis/unisocks.json'
import WETH_ABI from 'abis/weth.json'
import EIP_2612 from 'abis/eip_2612.json'
import IDO_ABI from 'abis/Ido.json'
import ES_TOKEN_ABI from 'abis/es-token.json'

import {
  ARGENT_WALLET_DETECTOR_ADDRESS,
  GOVERNANCE_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MULTICALL_ADDRESSES,
  V2_ROUTER_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  SOCKS_CONTROLLER_ADDRESSES,
  IDO_ADDRESS,
  ES_TOKEN_ADDRESS,
} from 'constants/addresses'
import { useMemo } from 'react'
import { getContract } from 'utils'
import {
  Erc20,
  ArgentWalletDetector,
  EnsPublicResolver,
  EnsRegistrar,
  Weth,
  IUniswapV2Router02,
  Ido,
  UniswapInterfaceMulticall,
  EsToken,
} from '../abis/types'
import { UNI } from '../constants/tokens'
import { useActiveWeb3React } from './web3'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH9[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useV2RouterContract(): Contract | null {
  return useContract<IUniswapV2Router02>(V2_ROUTER_ADDRESS, IUniswapV2Router02ABI, true) as IUniswapV2Router02
}

export function useMulticall2Contract() {
  return useContract<UniswapInterfaceMulticall>(MULTICALL_ADDRESSES, MulticallABI, false) as UniswapInterfaceMulticall
}

export function useMerkleDistributorContract() {
  return useContract(MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useGovernanceContract() {
  return useContract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, true)
}

export function useUniContract() {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? UNI[chainId]?.address : undefined, UNI_ABI, true)
}

export function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible)
}

export function useSocksController(): Unisocks | null {
  return useContract<Unisocks>(SOCKS_CONTROLLER_ADDRESSES, UNISOCKS_ABI, false)
}

export function useIDOContract(withSignerIfPossible?: boolean): Ido {
  return useContract<Ido>(IDO_ADDRESS, IDO_ABI, withSignerIfPossible) as Ido
}

export function useEsTokenContract(withSignerIfPossible?: boolean) {
  return useContract<EsToken>(ES_TOKEN_ADDRESS, ES_TOKEN_ABI, withSignerIfPossible) as EsToken
}
