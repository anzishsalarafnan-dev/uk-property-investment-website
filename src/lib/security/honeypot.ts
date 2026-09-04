/**
 * Simple honeypot check — if the hidden "website" field is filled,
 * the submission almost certainly came from a bot, not a human.
 */
export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
