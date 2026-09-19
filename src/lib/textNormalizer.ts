export function normalizeText(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[।.,!?;:]/g, "");
}

export function extractNumber(input: string): number | null {
  const trimmed = input.trim();
  const direct = /^(\d+)$/.exec(trimmed);
  if (direct) return parseInt(direct[1], 10);
  const hindiNumerals: Record<string, string> = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };
  let converted = trimmed;
  for (const [h, d] of Object.entries(hindiNumerals)) {
    converted = converted.replaceAll(h, d);
  }
  const match = /^(\d+)$/.exec(converted);
  return match ? parseInt(match[1], 10) : null;
}
