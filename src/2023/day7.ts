const HandValue = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
} as const;

type Card = { card: string; count: number };

const cardIndexIsPower = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

function calculate(cards: Card[]) {
  let FIVE_OF_A_KIND = false;
  let FOUR_OF_A_KIND = false;
  let FULL_HOUSE = false;
  let THREE_OF_A_KIND = false;
  let TWO_PAIR = false;
  let ONE_PAIR = false;

  for (let index = 0; index < cards.length; index++) {
    const element = cards.at(index);

    if (element !== undefined) {
      if (element.count === 2) {
        if (ONE_PAIR) {
          TWO_PAIR = true;
        } else {
          ONE_PAIR = true;
        }
      } else if (element.count === 5) {
        FIVE_OF_A_KIND = true;
      } else if (element.count === 4) {
        FOUR_OF_A_KIND = true;
      } else if (element.count === 3) {
        THREE_OF_A_KIND = true;
      }
    }
  }

  if (THREE_OF_A_KIND && ONE_PAIR) {
    FULL_HOUSE = true;
  }

  if (FIVE_OF_A_KIND) {
    return HandValue.FIVE_OF_A_KIND;
  } else if (FOUR_OF_A_KIND) {
    return HandValue.FOUR_OF_A_KIND;
  } else if (FULL_HOUSE) {
    return HandValue.FULL_HOUSE;
  } else if (THREE_OF_A_KIND) {
    return HandValue.THREE_OF_A_KIND;
  } else if (TWO_PAIR) {
    return HandValue.TWO_PAIR;
  } else if (ONE_PAIR) {
    return HandValue.ONE_PAIR;
  }

  return 0;
}

function splitCardCount(hand: string) {
  const cardCount: Card[] = [];

  for (let index = 0; index < hand.length; index++) {
    const existing = cardCount.findIndex((card) => card.card === hand[index]);

    if (existing >= 0) {
      cardCount[existing] = {
        card: cardCount[existing]!.card,
        count: cardCount[existing]!.count + 1,
      };
    } else {
      cardCount.push({
        card: hand[index]!,
        count: 1,
      });
    }
  }
  const sorted = cardCount.sort((a, b) => b.count - a.count);

  return sorted;
}

export function day7Part1(data: string) {
  const orderCardBid: {
    hand: string;
    // order: number;
    cards: Card[];
    bid: number;
    score: number;
  }[] = data
    .split('\n')
    .map((hand) => hand.split(' '))
    .map(([hand, bid]) => {
      const cards = splitCardCount(hand!);
      const score = calculate(cards);

      return {
        hand: hand!,
        cards: cards,
        bid: Number(bid),
        score: score,
      };
    })
    .sort((a, b) => {
      // Determine if this hand is "stronger"
      // by letter and score
      if (a.score !== b.score) {
        return a.score - b.score;
      }

      for (let i = 0; a.hand.length > i; i++) {
        let aChar = cardIndexIsPower.findIndex((v) => v === a.hand[i]);
        let bChar = cardIndexIsPower.findIndex((v) => v === b.hand[i]);
        if (aChar !== bChar) {
          return aChar - bChar;
        }
      }

      return 0;
    });

  return orderCardBid.reduce(
    (prev, cur, index) => prev + cur.bid * (index + 1),
    0
  );
}

export function day7Part2(data: string) {
  //
}
