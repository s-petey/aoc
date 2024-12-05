import { describe, expect, test } from 'bun:test';

describe('Day 1', () => {
  describe('Part 1', () => {
    test('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.example.data.txt`);
      const testData = await testDataFile.text();

      expect(true).toBeTrue();
    });

    test('Actual Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.data.txt`);
      const testData = await testDataFile.text();

      expect(true).toBeTrue();
    });
  });

  describe('Part 2', () => {
    test('Example Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.example.data.txt`);
      const testData = await testDataFile.text();

      expect(true).toBeTrue();
    });

    test('Actual Test', async () => {
      const testDataFile = Bun.file(`${import.meta.dir}/day1.data.txt`);
      const testData = await testDataFile.text();

      expect(true).toBeTrue();
    });
  });
});
