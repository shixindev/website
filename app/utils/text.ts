export function toSentenceCase(text: string) {
    const firstChar = text.substring(0, 1)
    const restChar = text.substring(1)

    return firstChar.toUpperCase().concat(restChar)
}
