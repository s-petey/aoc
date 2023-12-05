import { describe, expect, test } from 'bun:test';
import {
  day5Part1Attempt3
} from './day5';

describe('Day 5', () => {
  describe('Part 1', () => {
    test('Example lowest location number corresponding to initial seed numbers', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day5.example.data.txt`);
      const testData = await testDataFile.text();
      const lowestLocaiton = day5Part1Attempt3(testData);

      expect(lowestLocaiton).toEqual(35);
    });

    test('Actual lowest location corresponding to initial seed numbers', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day5.data.txt`);
      const testData = await testDataFile.text();
      const lowestLocaiton = day5Part1Attempt3(testData);

      expect(lowestLocaiton).toEqual(240320250);
    });
  });

  describe('Part 2', () => {
    test.skip('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day5.data.txt`);

      expect(true).toBeTrue();
    });
  });
});
