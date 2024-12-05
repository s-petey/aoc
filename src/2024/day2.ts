function diffSafe(a: number, b: number) {
  const diff = Math.abs(a - b);
  return diff <= 3 && diff >= 1;
}

function splitLineByNumber(data: string) {
  return data.split('\n').map((line) => {
    return line.split(/\s+/).map((num) => {
      const newNum = Number(num);
      if (Number.isNaN(newNum)) {
        throw new Error('Invalid number', { cause: num });
      }
      return newNum;
    });
  });
}

export function day2Part1(data: string) {
  const lines = splitLineByNumber(data);

  let safeLines = 0;
  linesLoop: for (const line of lines) {
    let safe = true;
    let type: 'increment' | 'decrement' | null = null;

    itemLoop: for (let i = 0; i < line.length - 1; i++) {
      const current = line.at(i);
      const next = line.at(i + 1);

      if (typeof current === 'number') {
        if (typeof next === 'number') {
          if (type === null) {
            if (current >= next) {
              type = 'decrement';
            } else if (current <= next) {
              type = 'increment';
            }
          }

          if (type === 'increment') {
            if (current >= next) {
              safe = false;
              continue linesLoop;
            }
          } else if (type === 'decrement') {
            if (current <= next) {
              safe = false;
              continue linesLoop;
            }
          }

          if (!diffSafe(current, next)) {
            safe = false;
            continue linesLoop;
          }
        }
      }
    }

    if (safe) {
      safeLines++;
    }
  }

  return safeLines;
}

function isSafe(line: number[]) {
  let isIncrementing = true;
  let isDecrementing = true;
  let isDiffSafe = true;
  let previousValue: number | null = null;

  for (const value of line) {
    if (previousValue !== null) {
      if (value <= previousValue) {
        isIncrementing = false;
      }

      if (value >= previousValue) {
        isDecrementing = false;
      }

      if (!diffSafe(value, previousValue)) {
        isDiffSafe = false;
        break;
      }
    }

    if (!isIncrementing && !isDecrementing) {
      break;
    }

    previousValue = value;
  }


  return (isIncrementing || isDecrementing) && isDiffSafe;
}

export function day2Part2(data: string) {
  const lines = splitLineByNumber(data);
  let safeLines = 0;

  for (const line of lines) {
    let lineIsSafe = isSafe(line);

    if (!lineIsSafe) {
      // Loop over each spliced item to see if we can make it safe
      for (const [index, _value] of line.entries()) {
        const lineToRetry = [...line];
        lineToRetry.splice(index, 1);
        const retrySafe = isSafe(lineToRetry);
        if (retrySafe) {
          lineIsSafe = true;
          break;
        }
      }
    }

    if (lineIsSafe) {
      safeLines++;
    }
  }

  return safeLines;
}
