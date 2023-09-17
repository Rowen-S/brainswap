import { isAddress } from '@ethersproject/address'
import { useDropContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { ZERO_ADDRESS } from 'constants/misc'

interface UserProofData {
  proofs: string[]
  amount: string
}

const MINT_PROMISES: { [key: string]: Promise<UserProofData | null> } = {}

// returns the claim for the given address, or null if not valid
function fetchClaim(account: string): Promise<UserProofData | null> {
  const formatted = isAddress(account)
  if (!formatted) return Promise.reject(new Error('Invalid address'))
  const key = `${account.toLocaleLowerCase()}`

  // fetch(`https://raw.githubusercontent.com/xxx${key}`)
  //   .then((res) => (res.ok ? res.json() : console.log(`No mint for account ${formatted}`)))
  //   .catch((error) => console.error('Failed to get mint data', error)))
  return (MINT_PROMISES[key] =
    MINT_PROMISES[key] ??
    new Promise((resolve) =>
      resolve(
        // {
        // proofs: ['0x6dcdb1e6bc704c351a550d7063f870a66823ddb9d3da4094c41aa7dd0664e557'],
        // amount: '3205804928762930256623',
        // }

        {
          proofs: [
            '0x8bc2540f24f0784abda1e0f5c9ed0d5a57d0aa94b05e9cb69996a8328dcac352',
            '0xe8c74d9fec4f6a041a27c7cbf290c0835df018e216140e368329b9b507e0f96b',
            '0x985537a0d85206ce9c5727ce10553f95eeb97004c827b28de0a1ed74243b393e',
          ],
          amount: '266409009281017724318',
        }
      )
    ))
}

// parse distributorContract blob and detect if user has white list data
// null means we know it does not
export function useUserRewardListData(account: string | null | undefined): UserProofData | null | undefined {
  const key = `${account}`
  const [claimInfo, setClaimInfo] = useState<{ [key: string]: UserProofData | null }>({})
  useEffect(() => {
    if (!account) return
    fetchClaim(account).then((accountClaimInfo) =>
      setClaimInfo((claimInfo) => {
        return {
          ...claimInfo,
          [key]: accountClaimInfo,
        }
      })
    )
  }, [account, key])

  return account ? claimInfo[key] : undefined
}

// Check whether the user is in the whitelist and has not mint (key)
export function useUserHasAvailableMint(account: string | null | undefined): {
  rewards: UserProofData | null | undefined
  isClaimd: boolean
} {
  const userRewardData = useUserRewardListData(account)
  const distributorContract = useDropContract()

  const merkleRoot = useSingleCallResult(distributorContract, 'merkleRoot', [])?.result?.[0]

  const isMintedResult = useSingleCallResult(distributorContract, 'withdrawn', [merkleRoot, account ?? ZERO_ADDRESS])

  // user is in blob and contract marks as unminted
  return {
    rewards: userRewardData,
    isClaimd: !isMintedResult.loading && isMintedResult.result?.[0],
  }
}
