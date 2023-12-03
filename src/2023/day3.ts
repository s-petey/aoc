// For each line look at the current
// previous, and next lines to determine
// where the symbols may effect this line.

// Split the line into numbers, and positions.

type LineNumber = {
  isSymbol: boolean;
  value: string | number;
  start: number;
  end: number;
  effected: boolean;
};

/**
 * Start is 1 based here.
 */
export function splitLineIntoNumberOrSymbolPositions(line: string) {
  const lineMatches: LineNumber[] = [];
  const reg = /(\d+)|[^.]/g;
  let regArray;

  while ((regArray = reg.exec(line)) !== null) {
    const foundNumber = parseInt(regArray[0]);
    const isSymbol = isNaN(foundNumber);
    const prevIsSymbolMatch = line
      .at(reg.lastIndex - regArray[0].length - 1)
      ?.match(/[^.|^\d]/);
    const nextIsSymbolMatch = line.at(reg.lastIndex)?.match(/[^.|^\d]/);
    const nextIsSymbol =
      nextIsSymbolMatch !== undefined && nextIsSymbolMatch !== null;
    const prevIsSymbol =
      prevIsSymbolMatch !== undefined && prevIsSymbolMatch !== null;

    lineMatches.push({
      isSymbol: isSymbol,
      value: isSymbol ? regArray[0] : foundNumber,
      start: reg.lastIndex - regArray[0].length,
      end: reg.lastIndex - 1,
      effected: nextIsSymbol || prevIsSymbol,
    });
  }

  return lineMatches;
}

export function symbolEffectedLines(lines: LineNumber[][]) {
  lines.forEach((currentLines, index) => {
    const nextLines = lines[index + 1];

    currentLines.forEach((currentLine) => {
      nextLines?.forEach((nextLine) => {
        if (currentLine.isSymbol) {
          if (
            currentLine.start === nextLine.start ||
            currentLine.start === nextLine.start + 1 ||
            currentLine.start === nextLine.start - 1 ||
            currentLine.start === nextLine.end ||
            currentLine.start === nextLine.end + 1 ||
            currentLine.start === nextLine.end - 1 ||
            currentLine.end === nextLine.start ||
            currentLine.end === nextLine.start + 1 ||
            currentLine.end === nextLine.start - 1 ||
            currentLine.end === nextLine.end ||
            currentLine.end === nextLine.end + 1 ||
            currentLine.end === nextLine.end - 1
          ) {
            nextLine.effected = true;
          }
        }

        if (nextLine.isSymbol) {
          if (
            nextLine.start === currentLine.start ||
            nextLine.start === currentLine.start + 1 ||
            nextLine.start === currentLine.start - 1 ||
            nextLine.start === currentLine.end ||
            nextLine.start === currentLine.end + 1 ||
            nextLine.start === currentLine.end - 1 ||
            nextLine.end === currentLine.start ||
            nextLine.end === currentLine.start + 1 ||
            nextLine.end === currentLine.start - 1 ||
            nextLine.end === currentLine.end ||
            nextLine.end === currentLine.end + 1 ||
            nextLine.end === currentLine.end - 1
          ) {
            currentLine.effected = true;
          }
        }
      });
    });
  });

  return lines;
}

export function getEffectedSum(lines: LineNumber[][]) {
  let sum = 0;

  lines.forEach((linePart) => {
    linePart.forEach((part) => {
      if (typeof part.value === 'number' && part.effected) {
        sum += part.value;
      }
    });
  });

  return sum;
}

type ValueCoordNumber = {
  type: 'number';
  x: number;
  y: number;
  rawValue: string;
  value: number;
};
type ValueCoordSymbol = {
  type: 'symbol';
  x: number;
  y: number;
  rawValue: string;
  value: null;
};

export function splitLinesIntoCoords(data: string) {
  const numberCoords: ValueCoordNumber[] = [];
  const symbolCoords: ValueCoordSymbol[] = [];

  data.split('\n').forEach((line, lineIndex) => {
    for (const { index, '0': match } of line.matchAll(/\d+/g)) {
      numberCoords.push({
        type: 'number',
        rawValue: match,
        value: parseInt(match),
        x: index!,
        y: lineIndex,
      });
    }
    for (const { index, '0': match } of line.matchAll(/[^\d\.]/g)) {
      symbolCoords.push({
        type: 'symbol',
        rawValue: match,
        value: null,
        x: index!,
        y: lineIndex,
      });
    }
  });

  return { numberCoords, symbolCoords };
}

function isRectangleAdjacent(
  numberCoord: ValueCoordNumber,
  symbolCoord: ValueCoordSymbol
) {
  const x0 = numberCoord.x - 1;
  const x1 = numberCoord.x + numberCoord.rawValue.length;
  const y0 = numberCoord.y - 1;
  const y1 = numberCoord.y + 1;

  return (
    symbolCoord.x >= x0 &&
    symbolCoord.x <= x1 &&
    symbolCoord.y >= y0 &&
    symbolCoord.y <= y1
  );
}

export function part2GearedSum(data: string) {
  const { numberCoords, symbolCoords } = splitLinesIntoCoords(data);

  const sum = symbolCoords
    .filter((symbol) => symbol.rawValue === '*')
    .map((symbol) => {
      const rectangleAdjacentNumbers = numberCoords
        .filter((number) => isRectangleAdjacent(number, symbol))
        .map((number) => number.value);

      const firstFound = rectangleAdjacentNumbers.at(0);
      const secondFound = rectangleAdjacentNumbers.at(1);

      if (typeof firstFound === 'number' && typeof secondFound === 'number') {
        return firstFound * secondFound;
      } else {
        return 0;
      }
    })
    .reduce((prev, cur) => prev + cur, 0);

  return sum;
}

// TODO: REMOVE THIS BAD ATTEMPT
/**
 * This was my first attempt attempting to re-use the existing logic.
 * However attempts are somewhat futile as using the rectangle reference
 * above in the other function works much better.
 */
export function part2GearAttemptSum(lines: LineNumber[][]) {
  let sum = 0;

  lines.forEach((currentLines, index) => {
    const nextLines = lines[index + 1];
    const prevousLines = lines[index - 1];

    currentLines.forEach((currentPart, partIndex) => {
      if (currentPart.isSymbol && currentPart.value === '*') {
        const prevPartIsNumber = currentLines[partIndex - 1]?.value;
        const nextPartIsNumber = currentLines[partIndex + 1]?.value;
        if (
          typeof prevPartIsNumber === 'number' &&
          typeof nextPartIsNumber === 'number'
        ) {
          sum += prevPartIsNumber * nextPartIsNumber;
        }

        // Multiply interwoven values.
        const prev =
          prevousLines?.filter((v) => {
            return (
              v.start === currentPart.start ||
              v.start === currentPart.start + 1 ||
              v.start === currentPart.start - 1 ||
              v.start === currentPart.end ||
              v.start === currentPart.end + 1 ||
              v.start === currentPart.end - 1 ||
              v.end === currentPart.start ||
              v.end === currentPart.start + 1 ||
              v.end === currentPart.start - 1 ||
              v.end === currentPart.end ||
              v.end === currentPart.end + 1 ||
              v.end === currentPart.end - 1
            );
          }) ?? [];
        const next =
          nextLines?.filter((v) => {
            return (
              v.start === currentPart.start ||
              v.start === currentPart.start + 1 ||
              v.start === currentPart.start - 1 ||
              v.start === currentPart.end ||
              v.start === currentPart.end + 1 ||
              v.start === currentPart.end - 1 ||
              v.end === currentPart.start ||
              v.end === currentPart.start + 1 ||
              v.end === currentPart.start - 1 ||
              v.end === currentPart.end ||
              v.end === currentPart.end + 1 ||
              v.end === currentPart.end - 1
            );
          }) ?? [];

        const prevEff = prev[0]?.value;
        const nextEff = next[0]?.value;

        if (typeof prevEff === 'number' && typeof nextEff === 'number') {
          sum += prevEff * nextEff;
        }
      }
    });
  });

  return sum;
}
