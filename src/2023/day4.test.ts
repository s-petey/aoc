import { describe, expect, test } from 'bun:test';
import { day4Part1, day4Part2 } from './day4';

describe('Day 4', () => {
  describe('Part 1', () => {
    describe('Example Data', () => {
      test('Example data returns sum 13', async () => {
        const testDataFile = Bun.file(
          `${import.meta.dir}/day4.example.data.txt`
        );
        const testData = await testDataFile.text();
        const sum = day4Part1(testData);

        expect(sum).toBe(13);
      });
    });

    describe('Actual data', () => {
      test('Example data returns sum 32609', async () => {
        const testDataFile = Bun.file(`${import.meta.dir}/day4.data.txt`);
        const testData = await testDataFile.text();

        const sum = day4Part1(testData);

        expect(sum).toBe(32609);
      });
    });
  });

  describe('Part 2', () => {
    describe('Example Data', () => {
      test('Example data returns sum 30', async () => {
        const testDataFile = Bun.file(
          `${import.meta.dir}/day4.example.data.txt`
        );
        const testData = await testDataFile.text();
        const sum = day4Part2(testData);

        expect(sum).toBe(30);
      });
    });

    describe('Actual data', () => {
      test('Example data returns id sum 14624680', async () => {
        const testDataFile = Bun.file(`${import.meta.dir}/day4.data.txt`);
        const testData = await testDataFile.text();
        const sum = day4Part2(testData);
        expect(sum).toBe(14624680);
      });
    });
  });
});
