// winning | actual
// first match is 1 point
// every match after doubles
// current points.
// Task: sum all points

function splitData(data: string) {
  const cardStrings = data.split('\n');
  const cardMap = new Map<
    number,
    {
      score: number;
      winning: number[];
      actual: number[];
    }
  >();

  cardStrings.forEach((card, index) => {
    const [_, cardData] = card.split(':');
    if (cardData !== undefined) {
      const [winningString, actualString] = cardData?.split('|');

      if (winningString !== undefined && actualString !== undefined) {
        const winning = [...winningString.matchAll(/\d+/g)].map(([n]) =>
          parseInt(n)
        );
        const actual = [...actualString.matchAll(/\d+/g)].map(([n]) =>
          parseInt(n)
        );
        let score = 0;

        actual.forEach((val) => {
          const winningIncludes = winning.includes(val);

          if (score === 0 && winningIncludes) {
            score++;
          } else if (winningIncludes) {
            score *= 2;
          }
        });

        cardMap.set(index + 1, {
          score,
          winning,
          actual,
        });
      }
    }
  });

  return cardMap;
}

export function day4Part1(data: string) {
  const cards = splitData(data);

  return Array.from(cards.values()).reduce((prev, cur) => prev + cur.score, 0);
}
