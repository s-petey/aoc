import { describe, expect, test } from 'bun:test';
import { part1Sum, part2BadGearSum, part2GearedSum } from './day3';

describe('Day 2', () => {
  describe('Part 1', () => {
    //
    describe('Example Data', () => {
      test('Example data returns sum 4361', async () => {
        const testDataFile = Bun.file(
          `${import.meta.dir}/day3.example.data.txt`
        );
        const testData = await testDataFile.text();
        const sum = part1Sum(testData);

        expect(sum).toBe(4361);
      });
    });

    describe('Actual data', () => {
      test('Example data returns sum 525911', async () => {
        const testDataFile = Bun.file(`${import.meta.dir}/day3.data.txt`);
        const testData = await testDataFile.text();

        const sum = part1Sum(testData);

        expect(sum).toBe(525911);
      });
    });
  });

  describe('Part 2', () => {
    //
    describe('Example Data', () => {
      test('Example data returns sum 467835', async () => {
        const testDataFile = Bun.file(
          `${import.meta.dir}/day3.example.data.txt`
        );
        const testData = await testDataFile.text();
        const sum = part2GearedSum(testData);

        expect(sum).toBe(467835);
      });

      test('Bad attempt still returns sum 467835', async () => {
        const testDataFile = Bun.file(
          `${import.meta.dir}/day3.example.data.txt`
        );
        const testData = await testDataFile.text();
        const sum = part2BadGearSum(testData);

        expect(sum).toBe(467835);
      });
    });

    describe('Actual data', () => {
      test('Example data returns id sum 75805607', async () => {
        const testDataFile = Bun.file(`${import.meta.dir}/day3.data.txt`);
        const testData = await testDataFile.text();
        const sum = part2GearedSum(testData);

        expect(sum).toBe(75805607);
      });
    });
  });
});
