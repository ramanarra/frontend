export const customSuffix = (value, format) => {
  const pattern = ('' + value).replace(/[^\d]/g, '')
  if (pattern.length > 0) {
    return pattern.replace(/(\d{1,})/, '$1 ' + format)
  }
  return value
}
