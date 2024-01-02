const truncateString = (string: string, displayedLength: number) => {
  return string.length > displayedLength
    ? string.slice(0, displayedLength - 1) + "..."
    : string
}

export default truncateString
