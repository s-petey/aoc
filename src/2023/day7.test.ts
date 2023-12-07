import { describe, expect, test } from 'bun:test';
import { day7Part1 } from './day7';

describe('Day 7', () => {
  describe('Part 1', () => {
    test('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day7.example.data.txt`);
      const testData = await testDataFile.text();
      const result = day7Part1(testData);

      expect(result).toEqual(6440);
    });

    test.only('Actual Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day7.data.txt`);
      const testData = await testDataFile.text();
      const result = day7Part1(testData);

      expect(result).toEqual(241344943);
    });
  });

  describe('Part 2', () => {
    // test('Example Test', async () => {
    //   const testDataFile = Bun.file(`${import.meta.dir}/day7.example.data.txt`);
    //   const testData = await testDataFile.text();
    //   expect(true).toBeTrue();
    // });
    //
    // test('Actual Test', async () => {
    //   const testDataFile = Bun.file(`${import.meta.dir}/day7.data.txt`);
    //   const testData = await testDataFile.text();
    //   expect(true).toBeTrue();
    // });
  });
});
