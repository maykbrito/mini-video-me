export function hexToDecimal(hex: string) {
  const _hex = parseInt(hex, 16)

  return Number(_hex.toString(10))
}

export function decimalToHex(decimal: string) {
  const _decimal = parseInt(decimal, 10)

  return _decimal.toString(16)
}
