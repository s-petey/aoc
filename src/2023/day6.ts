export function day6Part1(data: string) {
  const [times, distance] =
    data
      .split('\n\n')
      .shift()
      ?.split('\n')
      .map(
        (line) =>
          line
            .split(':')
            .at(1)
            ?.split(' ')
            .filter((v) => v.length > 0)
            .map((i) => i.trim())
            .map(Number)
      ) ?? [];

  if (times === undefined || distance === undefined) {
    throw new Error('Invalid data');
  }

  const timeDistance = new Map<number, number>();
  times.forEach((num, numIndex) => {
    const maybe = distance.at(numIndex);
    timeDistance.set(num, maybe!);
  });

  const winningTimes = new Map<number, number[]>();
  Array.from(timeDistance.entries()).forEach(([time, distance], raceNum) => {
    // calculate what times would beat this...
    for (let heldTime = 0; heldTime <= time; heldTime++) {
      const existingTimes = winningTimes.get(raceNum);

      const remainingTime = time - heldTime;
      if (remainingTime * heldTime <= distance) continue;

      if (existingTimes !== undefined) {
        winningTimes.set(raceNum, existingTimes.concat(heldTime));
      } else {
        winningTimes.set(raceNum, [heldTime]);
      }
    }
  });

  return Array.from(winningTimes.values())
    .map((numbers) => numbers.length)
    .reduce((prev, cur) => prev * cur, 1);
}

export function day6Part1Attempt2(data: string) {
  const [maxTimes, maxDistances] =
    data
      .split('\n\n')
      .shift()
      ?.split('\n')
      .map(
        (line) =>
          line
            .split(':')
            .at(1)
            ?.split(' ')
            .filter((v) => v.length > 0)
            .map((i) => i.trim())
            .map(Number)
      ) ?? [];

  if (maxTimes === undefined || maxDistances === undefined) {
    throw new Error('Invalid data');
  }

  let winningTimes = Array.from({ length: maxTimes.length }, () => 0);

  for (let index = 0; index < maxTimes.length; index++) {
    const maxDistance = maxDistances.at(index);
    const maxTime = maxTimes.at(index);

    if (maxDistance !== undefined && maxTime !== undefined) {
      for (let milliseconds = 1; milliseconds <= maxTime; milliseconds++) {
        const distance = milliseconds * (maxTime - milliseconds);
        if (distance > maxDistance) winningTimes[index] += 1;
      }
    }
  }

  return winningTimes.reduce((prev, curr) => prev * curr, 1);
}

export function day6Part2(data: string) {
  const [time, distance] =
    data
      .split('\n\n')
      .shift()
      ?.split('\n')
      .map(
        (line) =>
          line
            .split(':')
            .at(1)
            ?.split(' ')
            .filter((v) => v.length > 0)
            .map((i) => i.trim())
            .reduce((prev, curr) => prev + curr, '')
      )
      .map(Number) ?? [];

  if (time === undefined || distance === undefined) {
    throw new Error('Invalid data');
  }

  const winningTimes: number[] = [];
  // calculate what times would beat this...
  for (let heldTime = 0; heldTime <= time; heldTime++) {
    const remainingTime = time - heldTime;
    if (remainingTime * heldTime <= distance) continue;
    winningTimes.push(heldTime);
  }

  return winningTimes.length;
}

export function day6Part2Attempt2(data: string) {
  const [maxTime, maxDistance] =
    data
      .split('\n\n')
      .shift()
      ?.split('\n')
      .map((line) => Number(line.split(':').at(1)?.split(' ').join(''))) ?? [];

  if (maxTime === undefined || maxDistance === undefined) {
    throw new Error('Invalid data');
  }

  let winningTimes = 0;

  if (maxDistance !== undefined && maxTime !== undefined) {
    for (let milliseconds = 1; milliseconds <= maxTime; milliseconds++) {
      const distance = milliseconds * (maxTime - milliseconds);
      if (distance > maxDistance) winningTimes += 1;
    }
  }

  return winningTimes;
}
