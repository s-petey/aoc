import { describe, expect, test } from 'bun:test';
import { day2Part1, day2Part2 } from './day2';

describe('Day 2', () => {
  describe('Part 1', () => {
    test('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day2.example.data.txt`);
      const testData = await testDataFile.text();
      const result = day2Part1(testData);

      expect(result).toBe(2);
    });

    test('Actual Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day2.data.txt`);
      const testData = await testDataFile.text();
      const result = day2Part1(testData);

      expect(result).toBe(421);
    });
  });

  describe('Part 2', () => {
    test('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day2.example.data.txt`);
      const testData = await testDataFile.text();
      const result = day2Part2(testData);

      expect(result).toBe(4);
    });

    test('Actual Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day2.data.txt`);
      const testData = await testDataFile.text();
      const result = day2Part2(testData);

      expect(result).toBe(476);
    });
  });
});
