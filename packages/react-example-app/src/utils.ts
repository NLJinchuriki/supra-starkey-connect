export function remove0xPrefix(value: string): string => value.startsWith('0x') ? value.slice(2) : value

