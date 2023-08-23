import { ApolloClient, InMemoryCache } from '@apollo/client'

export const idoClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.thegraph.com/subgraphs/name/brainswapfi/ido',
})

export const tradingClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.thegraph.com/subgraphs/name/brainswapfi/brainswap',
})
