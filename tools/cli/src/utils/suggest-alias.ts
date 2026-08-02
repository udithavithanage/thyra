function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

export function suggestClosestAlias(name: string, aliases: string[]): string | null {
  let closest = "";
  let minDistance = Infinity;

  for (const alias of aliases) {
    if (alias.includes(name)) {
      return alias; // fast path
    }
    const dist = levenshteinDistance(name, alias);
    if (dist < minDistance) {
      minDistance = dist;
      closest = alias;
    }
  }

  if (closest && minDistance <= 3) {
    return closest;
  }

  return null;
}