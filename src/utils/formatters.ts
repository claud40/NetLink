/**
 * Utility functions for NetLink
 */

export function formatPrefixList(prefixes: string[]): string {
  return prefixes.join(', ');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}
