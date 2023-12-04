import { describe, expect, test } from 'bun:test';
import { day4Part1 } from './day4';

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
    // describe('Example Data', () => {
    //   test('Example data returns sum 467835', async () => {
    //     const testDataFile = Bun.file(
    //       `${import.meta.dir}/day3.example.data.txt`
    //     );
    //     const testData = await testDataFile.text();
    //     const sum = part2GearedSum(testData);
    //     expect(sum).toBe(467835);
    //   });
    //   test('Bad attempt still returns sum 467835', async () => {
    //     const testDataFile = Bun.file(
    //       `${import.meta.dir}/day3.example.data.txt`
    //     );
    //     const testData = await testDataFile.text();
    //     const sum = part2BadGearSum(testData);
    //     expect(sum).toBe(467835);
    //   });
    // });
    //   describe('Actual data', () => {
    //     test('Example data returns id sum 75805607', async () => {
    //       const testDataFile = Bun.file(`${import.meta.dir}/day3.data.txt`);
    //       const testData = await testDataFile.text();
    //       const sum = part2GearedSum(testData);
    //       expect(sum).toBe(75805607);
    //     });
    //   });
  });
});
