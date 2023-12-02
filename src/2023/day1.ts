export function day1Part1(values: string[]) {
  let sum = 0;
  const decodedNumbers: number[] = [];

  values.forEach((value) => {
    const matchedNumbers = Array.from(value.matchAll(/[0-9]/g)).map(([val]) =>
      Number(val)
    );

    const firstNumber = matchedNumbers.at(0);
    const lastNumber = matchedNumbers.at(
      matchedNumbers.length - 1 < 0 ? 0 : matchedNumbers.length - 1
    );

    if (typeof firstNumber === "number" && typeof lastNumber === "number") {
      const combinedNumber = Number(`${firstNumber}${lastNumber}`);
      sum += combinedNumber;
      decodedNumbers.push(combinedNumber);
    }
  });

  return { decodedNumbers: decodedNumbers, sum: sum };
}

const VALID_NUMBER_STRINGS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;

function convertValidNumbersToValue(numString: string) {
  const expectedType = numString as (typeof VALID_NUMBER_STRINGS)[number];
  switch (expectedType) {
    case "eight":
      return 8;
    case "five":
      return 5;
    case "four":
      return 4;
    case "nine":
      return 9;
    case "one":
      return 1;
    case "seven":
      return 7;
    case "six":
      return 6;
    case "three":
      return 3;
    case "two":
      return 2;
    default:
      const invalidValue: (typeof VALID_NUMBER_STRINGS)[number] = expectedType;
      throw new Error("Invalid value passed", { cause: invalidValue });
  }
}

export function day1Part2(values: string[]) {
  let sum = 0;
  const decodedNumbers: number[] = [];
  const validStrings = VALID_NUMBER_STRINGS.join("|");
  const firstRegexObj = new RegExp(`${validStrings}|[0-9]`);
  const lastRegexObj = new RegExp(`.*(${validStrings}|[0-9])`);

  values.forEach((value) => {
    const firstMatch = value.toLowerCase().match(firstRegexObj)?.at(0);
    let lastMatch = value.toLowerCase().match(lastRegexObj)?.at(1);

    if (firstMatch === undefined || lastMatch === undefined) {
      console.error(value);
      throw new Error("Invalid values", {
        cause: `first: ${firstMatch} - last: ${lastMatch}`,
      });
    }

    let convertedFirstNumber = Number(firstMatch);
    let convertedLastNumber = Number(lastMatch);
    if (isNaN(convertedFirstNumber))
      convertedFirstNumber = convertValidNumbersToValue(firstMatch);
    if (isNaN(convertedLastNumber))
      convertedLastNumber = convertValidNumbersToValue(lastMatch);

    const combinedNumber = Number(
      `${convertedFirstNumber}${convertedLastNumber}`
    );
    sum += combinedNumber;
    decodedNumbers.push(combinedNumber);
  });

  return { decodedNumbers: decodedNumbers, sum: sum };
}
