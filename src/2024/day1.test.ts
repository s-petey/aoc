import { describe, expect, test } from 'bun:test';
import { day1Part1, day1Part2 } from './day1';

describe('Day 1', () => {
  describe('Part 1', () => {
    test('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.example.data.txt`);
      const testData = await testDataFile.text();
      const result = day1Part1(testData);

      expect(result).toBe(11);
    });

    test('Actual Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.data.txt`);
      const testData = await testDataFile.text();
      const result = day1Part1(testData);

      expect(result).toBe(1189304);
    });
  });

  describe('Part 2', () => {
    test('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.example.data.txt`);
      const testData = await testDataFile.text();
      const result = day1Part2(testData);

      expect(result).toBe(31);
    });

    test('Actual Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.data.txt`);
      const testData = await testDataFile.text();
      const result = day1Part2(testData);

      expect(result).toBe(24349736);
    });
  });
});
