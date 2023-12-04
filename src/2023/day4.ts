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

function splitDataPart2(data: string) {
  const cards = splitData(data);
  // Fill a new map for the card key (number) and count of cards obtained.
  const cardsCounted = new Map<number, number>();
  // Fill the map
  cards.forEach((_, i) => {
    // Make an item for each card.
    cardsCounted.set(i, 1);
  });

  cards.forEach(({ actual, winning }, index) => {
    let winningCards = actual.filter((number) =>
      winning.includes(number)
    ).length;

    while (winningCards > 0) {
      const totalValue = cardsCounted.get(index);
      if (totalValue !== undefined) {
        const valToUpdate = cardsCounted.get(index + winningCards);
        if (valToUpdate !== undefined) {
          cardsCounted.set(index + winningCards, valToUpdate + totalValue);
        }
        winningCards--;
      }
    }
  });

  return Array.from(cardsCounted.values()).reduce((prev, cur) => prev + cur, 0);
}

export function day4Part2(data: string) {
  const cards = splitDataPart2(data);

  return cards;
}
