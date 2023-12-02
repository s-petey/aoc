import { describe, expect, test } from 'bun:test';
import {
  day2Part1,
  day2Part1Section,
  day2Part1SumIds,
  day2Part2CombinedSmallestPowers,
  day2Part2SmallestToPower,
} from './day2';
import { part1Data, part1ExampleData } from './day2.data';

describe('Day 2', () => {
  describe('Part 1', () => {
    describe('Example Data', () => {
      test.each([
        [true, part1ExampleData.at(0)!],
        [true, part1ExampleData.at(1)!],
        [false, part1ExampleData.at(2)!],
        [false, part1ExampleData.at(3)!],
        [true, part1ExampleData.at(4)!],
      ])('Single item returns validity %o', (expected, testData) => {
        const combinedData = day2Part1Section(testData, {
          blue: 14,
          green: 13,
          red: 12,
        });

        expect(combinedData.some((d) => d.validGame === expected)).toBeTrue();
      });

      test.each([
        [true, part1ExampleData.at(0)!],
        [true, part1ExampleData.at(1)!],
        [false, part1ExampleData.at(2)!],
        [false, part1ExampleData.at(3)!],
        [true, part1ExampleData.at(4)!],
      ])('Arrays returns validity %o', (expected, testData) => {
        const combinedData = day2Part1([testData], {
          blue: 14,
          green: 13,
          red: 12,
        });

        const testedValue = Array.from(combinedData.values()).at(0);

        expect(testedValue?.validGame).toBe(expected);
      });

      test('Example data returns id sum 8', () => {
        const sum = day2Part1SumIds(part1ExampleData, {
          blue: 14,
          green: 13,
          red: 12,
        });

        expect(sum).toBe(8);
      });
    });

    describe('Actual Data', () => {
      test('Example data returns id sum 2476', () => {
        const sum = day2Part1SumIds(part1Data, {
          blue: 14,
          green: 13,
          red: 12,
        });

        expect(sum).toBe(2476);
      });
    });
  });

  describe('Part 2', () => {
    describe('Example data', () => {
      test.each([
        [48, part1ExampleData.at(0)!],
        [12, part1ExampleData.at(1)!],
        [1560, part1ExampleData.at(2)!],
        [630, part1ExampleData.at(3)!],
        [36, part1ExampleData.at(4)!],
      ])('Computes %d from example data', (expected, testData) => {
        const [value] = day2Part2SmallestToPower([testData], {
          blue: 14,
          green: 13,
          red: 12,
        });

        expect(value).toBe(expected);
      });
    });

    test('Combined example value will be 2286', () => {
      const value = day2Part2CombinedSmallestPowers(part1ExampleData, {
        blue: 14,
        green: 13,
        red: 12,
      });

      expect(value).toBe(2286);
    });
  });

  describe('Actual Data', () => {
    test('Example data returns id sum 54911', () => {
      const sum = day2Part2CombinedSmallestPowers(part1Data, {
        blue: 14,
        green: 13,
        red: 12,
      });

      expect(sum).toBe(54911);
    });
  });
});
