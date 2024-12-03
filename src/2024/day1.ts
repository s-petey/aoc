function getListFromData(data: string) {
  const left: number[] = [];
  const right: number[] = [];

  const lines = data.split('\n');
  for (const line of lines) {
    const [l, r] = line.split(/\s+/);
    if (!l || !r) {
      throw new Error('Invalid data');
    }

    const leftNumber = Number(l);
    const rightNumber = Number(r);
    if (Number.isNaN(leftNumber) || Number.isNaN(rightNumber)) {
      throw new Error('Invalid data');
    }

    left.push(leftNumber);
    right.push(rightNumber);
  }

  return { dataLength: lines.length, left, right };
}

export function day1Part1(data: string) {
  const { left, right, dataLength } = getListFromData(data);

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;

  for (let index = 0; index < dataLength; index++) {
    const leftNumber = left.at(index);
    const rightNumber = right.at(index);

    if (!leftNumber || !rightNumber) {
      throw new Error('Invalid data');
    }

    if (leftNumber > rightNumber) {
      sum += leftNumber - rightNumber;
    } else if (rightNumber > leftNumber) {
      sum += rightNumber - leftNumber;
    }
  }

  return sum;
}

export function day1Part2(data: string) {
  const { left, right, dataLength } = getListFromData(data);

  let total = 0;

  for (let index = 0; index < dataLength; index++) {
    const leftNumber = left.at(index);
    if (!leftNumber) {
      throw new Error('Invalid data -- missing left number');
    }

    const rightCount = right.filter((r) => r === leftNumber).length;

    if (rightCount > 0) {
      total += rightCount * leftNumber;
    }
  }

  return total;
}
