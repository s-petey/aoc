import { describe, expect, test } from 'bun:test';
import {
  getEffectedSum,
  part2GearAttemptSum,
  part2GearedSum,
  splitLineIntoNumberOrSymbolPositions,
  symbolEffectedLines,
} from './day3';

describe('Day 2', () => {
  describe('Part 1', () => {
    //
    describe('Example Data', () => {
      test('Example data returns sum 4361', async () => {
        const testDataFile = Bun.file(
          `${import.meta.dir}/day3.example.data.txt`
        );
        const testData = await testDataFile.text();
        const splitData = testData.split('\n');

        const sum = getEffectedSum(
          symbolEffectedLines(
            splitData.map((v) => splitLineIntoNumberOrSymbolPositions(v))
          )
        );

        expect(sum).toBe(4361);
      });
    });

    describe('Actual data', () => {
      test('Example data returns sum 525911', async () => {
        const testDataFile = Bun.file(`${import.meta.dir}/day3.data.txt`);
        const testData = await testDataFile.text();
        const splitData = testData.split('\n');

        const sum = getEffectedSum(
          symbolEffectedLines(
            splitData.map((v) => splitLineIntoNumberOrSymbolPositions(v))
          )
        );

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
        const splitData = testData.split('\n');

        const sum = part2GearAttemptSum(
          symbolEffectedLines(
            splitData.map((v) => splitLineIntoNumberOrSymbolPositions(v))
          )
        );

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
