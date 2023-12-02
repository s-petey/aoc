type GameColors = {
  validGame: boolean;
  blue: number;
  red: number;
  green: number;
};

function splitColors(matches: RegExpMatchArray | null) {
  let sum: number = 0;

  matches?.forEach((prev) => {
    const maybeNumber = parseInt(prev);

    if (!isNaN(maybeNumber)) {
      sum += parseInt(prev);
    }
  });

  return sum;
}

function getGameColors(game: string, expected: Omit<GameColors, 'validGame'>) {
  const blue = splitColors(game.match(/(\d+) blue/g));
  const red = splitColors(game.match(/(\d+) red/g));
  const green = splitColors(game.match(/(\d+) green/g));
  let blueNumber: number = blue;
  let redNumber: number = red;
  let greenNumber: number = green;

  return checkPullValidity(
    { blue: blueNumber, red: redNumber, green: greenNumber, validGame: true },
    expected
  );
}

function checkPullValidity(
  initial: GameColors,
  expected: Omit<GameColors, 'validGame'>
) {
  const copied = { ...initial };
  if (initial.blue > expected.blue) {
    copied.validGame = false;
  }
  if (initial.red > expected.red) {
    copied.validGame = false;
  }
  if (initial.green > expected.green) {
    copied.validGame = false;
  }

  return copied;
}

export function day2Part1Section(
  section: string,
  expected: Omit<GameColors, 'validGame'>
) {
  return section.split(';').map((pull) => {
    return getGameColors(pull, expected);
  });
}

export function day2Part1(
  data: string[],
  expected: Omit<GameColors, 'validGame'>
) {
  const splitGames = new Map<number, GameColors>();

  data.forEach((val) => {
    const [name, section] = val.split(':');

    if (name !== undefined) {
      const numberName = parseInt(name.replace('Game ', ''));
      const gameData = day2Part1Section(section ?? '', expected);

      const combined = gameData.reduce((prev, current) => {
        const anyPrevValid =
          current.validGame === false ? false : prev.validGame;
        return {
          validGame: anyPrevValid,
          red: (current.red += prev.red),
          green: (current.green += prev.green),
          blue: (current.blue += prev.blue),
        };
      });

      splitGames.set(numberName, combined);
    }
  });

  return splitGames;
}

export function day2Part1SumIds(
  data: string[],
  expected: Omit<GameColors, 'validGame'>
) {
  const parsedData = day2Part1(data, expected);
  let sum = 0;
  Array.from(parsedData.entries()).forEach(([name, val]) => {
    if (val.validGame) {
      sum += name;
    }
  });

  return sum;
}

function day2Part2SmallestCube(
  data: string[],
  expected: Omit<GameColors, 'validGame'>
) {
  const smallestPerGame = new Map<number, GameColors>();

  data.forEach((val) => {
    const [name, section] = val.split(':');
    if (name !== undefined) {
      const numberName = parseInt(name.replace('Game ', ''));
      const gameData = day2Part1Section(section ?? '', expected);

      const combined = gameData.reduce((prev, current) => {
        const anyPrevValid =
          current.validGame === false ? false : prev.validGame;
        return {
          validGame: anyPrevValid,
          red: current.red < prev.red ? prev.red : current.red,
          green: current.green < prev.green ? prev.green : current.green,
          blue: current.blue < prev.blue ? prev.blue : current.blue,
        };
      });

      smallestPerGame.set(numberName, combined);
    }
  });

  return smallestPerGame;
}

export function day2Part2SmallestToPower(
  data: string[],
  expected: Omit<GameColors, 'validGame'>
) {
  const smallestGames = day2Part2SmallestCube(data, expected);

  return Array.from(smallestGames.values()).map((values) => {
    return values.red * values.green * values.blue;
  });
}

export function day2Part2CombinedSmallestPowers(
  data: string[],
  expected: Omit<GameColors, 'validGame'>
) {
  const powers = day2Part2SmallestToPower(data, expected);

  return powers.reduce((prev, curr) => prev + curr);
}
