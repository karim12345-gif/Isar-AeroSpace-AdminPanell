export const convertToDecimalPlaces = (value: number | string, decimalPlaces = 2): string => {
  const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${decimalPlaces}})?`)

  if (typeof value === 'string') {
    const match = value.match(regex)

    return match ? match[0] : '0'
  }

  const match = value.toString().match(regex)

  return match ? match[0] : '0'
}
