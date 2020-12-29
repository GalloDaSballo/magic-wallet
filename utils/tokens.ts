/**
 * Fetch Tokens
 * Currently uses Uniswap Public Worker (Ty Uni!)
 * 
 * In the future we should upgrade this to use Token Lists
 * https://tokenlists.org/
 */
export const fetchTokens = async () => {
  const res = await fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link')
  const data = await res.json()
  return data?.tokens
}