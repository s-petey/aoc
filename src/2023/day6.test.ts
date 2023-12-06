import { describe, expect, test } from 'bun:test';
import {
  day6Part1,
  day6Part1Attempt2,
  day6Part2,
  day6Part2Attempt2,
} from './day6';

describe('Day 6', () => {
  describe('Part 1', () => {
    test('Example multiplied sum of each winning race is 288', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day6.example.data.txt`);
      const testData = await testDataFile.text();
      const winningRaceOptionsMultiplied = day6Part1(testData);

      expect(winningRaceOptionsMultiplied).toEqual(288);
    });

    test('Actual data', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day6.data.txt`);
      const testData = await testDataFile.text();
      const winningRaceOptionsMultiplied = day6Part1(testData);

      expect(winningRaceOptionsMultiplied).toEqual(114400);
    });

    test('Actual data SPEED', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day6.data.txt`);
      const testData = await testDataFile.text();
      const winningRaceOptionsMultiplied = day6Part1Attempt2(testData);

      expect(winningRaceOptionsMultiplied).toEqual(114400);
    });
  });

  describe('Part 2', () => {
    test('Example combined numbers winning sum', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day6.example.data.txt`);
      const testData = await testDataFile.text();
      const totalWinningTimes = day6Part2(testData);

      expect(totalWinningTimes).toEqual(71503);
    });

    test('Actual combined numbers winning sum', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day6.data.txt`);
      const testData = await testDataFile.text();
      const totalWinningTimes = day6Part2(testData);

      expect(totalWinningTimes).toEqual(21039729);
    });
    test('Actual combined numbers winning sum SPEED', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day6.data.txt`);
      const testData = await testDataFile.text();
      const totalWinningTimes = day6Part2Attempt2(testData);

      expect(totalWinningTimes).toEqual(21039729);
    });
  });
});
