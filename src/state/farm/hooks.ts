import { isAddress } from '@ethersproject/address'
import { useEffect, useState } from 'react'
// import { useSingleCallResult } from 'state/multicall/hooks'
// import { ZERO_ADDRESS } from 'constants/misc'

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
      resolve({
        proofs: ['0xaec3e3051b45e4c2682be9fa73c0b1b73c7c52f795fedcaf628d213d97edf59a'],
        amount: '516046972320789937105582435',
      })
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

// // Check whether the user is in the whitelist and has not mint (key)
// export function useUserHasAvailableMint(account: string | null | undefined): {
//   proof: string[] | undefined
//   isMinted: boolean
// } {
//   const userMintData = useUserWhiteListData(account)
//   const distributorContract = useRa1seBoxContract()
//   const isMintedResult = useSingleCallResult(distributorContract, 'mintedAddress', [account ?? ZERO_ADDRESS])
//   // user is in blob and contract marks as unminted
//   return {
//     proof: userMintData?.proof,
//     isMinted: !isMintedResult.loading && isMintedResult.result?.[0],
//   }
// }
