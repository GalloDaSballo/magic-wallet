import { utils } from 'ethers'
const { parseUnits } = utils
/**
 *
 * @param newValue string
 */
export const fromStringToBN = (newValue: string, decimals) => {
  if (newValue.trim() === '') parseUnits('0', decimals)
  try {
    return parseUnits(newValue, decimals)
  } catch {
    // remove any decimals after the decimalsTHh
    const trimmedString = newValue.slice(
      0,
      newValue.indexOf('.') + decimals + 1
    )
    parseUnits(trimmedString, decimals)
  }
}
