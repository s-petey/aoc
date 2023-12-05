// DON'T USE!!!
export function part1AttemptTimesOut(data: string) {
  const dataLines = data.split('\n');

  const destinationSourceRangeMaps = new Map<string, Map<number, number>>();
  const seeds: number[] = [];
  let section = '';

  dataLines.forEach((line) => {
    if (line.startsWith('seeds:')) {
      const [_, numbersString] = line.split(':');
      numbersString?.split(' ').forEach((maybeNum) => {
        const num = parseInt(maybeNum);

        if (!isNaN(num)) {
          seeds.push(num);
        }
      });
    } else if (line.endsWith('map:')) {
      section = line;
    } else {
      const containsOnlyThreeNumbers = line.match(/^(\d+\s+){2}\d+$/);
      const [destination, source, range] =
        containsOnlyThreeNumbers?.at(0)?.split(' ') ?? [];

      if (
        destination !== undefined &&
        source !== undefined &&
        range !== undefined
      ) {
        let combinedRange = destinationSourceRangeMaps.get(section);

        if (combinedRange !== undefined) {
          for (let index = 0; index < parseInt(range); index++) {
            combinedRange = combinedRange.set(
              parseInt(source) + index,
              parseInt(destination) + index
            );
          }
        } else {
          combinedRange = new Map();
          for (let index = 0; index < parseInt(range); index++) {
            combinedRange = combinedRange.set(
              parseInt(source) + index,
              parseInt(destination) + index
            );
          }
        }

        destinationSourceRangeMaps.set(section, combinedRange);
      }
    }
  });

  // console.log(destinationSourceRangeMaps);

  const seedSoil = destinationSourceRangeMaps.get('seed-to-soil map:');
  const soilFertilizer = destinationSourceRangeMaps.get(
    'soil-to-fertilizer map:'
  );
  const fertilizerWater = destinationSourceRangeMaps.get(
    'fertilizer-to-water map:'
  );
  const waterLight = destinationSourceRangeMaps.get('water-to-light map:');
  const lightTemperature = destinationSourceRangeMaps.get(
    'light-to-temperature map:'
  );
  const temperatureHumidity = destinationSourceRangeMaps.get(
    'temperature-to-humidity map:'
  );
  const humidityLocation = destinationSourceRangeMaps.get(
    'humidity-to-location map:'
  );
  if (seedSoil === undefined) throw new Error('no seed data');
  if (soilFertilizer === undefined) throw new Error('no soil data');
  if (fertilizerWater === undefined) throw new Error('no fertilizer data');
  if (waterLight === undefined) throw new Error('no water data');
  if (lightTemperature === undefined) throw new Error('no light data');
  if (temperatureHumidity === undefined) throw new Error('no temperature data');
  if (humidityLocation === undefined) throw new Error('no humidity data');

  const locations: number[] = [];

  seeds.forEach((seed) => {
    const soil = getValueOrMatch(seed, seedSoil);
    const fertilizer = getValueOrMatch(soil, soilFertilizer);
    const water = getValueOrMatch(fertilizer, fertilizerWater);
    const light = getValueOrMatch(water, waterLight);
    const temperature = getValueOrMatch(light, lightTemperature);
    const humidity = getValueOrMatch(temperature, temperatureHumidity);
    const location = getValueOrMatch(humidity, humidityLocation);
    locations.push(location);
  });

  return Math.min(...locations);
}

function getValueOrMatch(seed: number, map: Map<number, number>): number {
  const foundDestinationSource = map.get(seed);

  if (foundDestinationSource !== undefined) {
    return foundDestinationSource;
  }

  return seed;
}

const destinationSourceRangeMaps = new Map<
  string,
  [number, number, number][]
>();

// TODO: Write a version that iterates over the
// string to compare speed?

function getPosition(point: number, mapKey: string) {
  const map = destinationSourceRangeMaps.get(mapKey);
  if (map === undefined)
    throw new Error('No map with key: ', { cause: mapKey });

  for (const [source, destination, range] of map) {
    if (point >= destination && point < destination + range) {
      const foo = source + (point - destination);
      return foo;
    }
  }

  return point;
}

// Times out again...
export function day5Part1Attempt2(data: string) {
  const dataLines = data.split('\n');
  const seedsToBePlanted: number[] = [];
  let section = '';
  const locations: number[] = [];

  dataLines.forEach((line) => {
    if (line.includes('seeds:')) {
      line.split(' ').forEach((v) => {
        const maybe = parseInt(v);
        if (!isNaN(maybe)) {
          seedsToBePlanted.push(maybe);
        }
      });
    } else if (line.endsWith('map:')) {
      section = line;
    } else {
      const containsOnlyThreeNumbers = line.match(/^(\d+\s+){2}\d+$/);
      const matchedNumbers = containsOnlyThreeNumbers?.at(0)?.split(' ');
      if (matchedNumbers !== undefined) {
        const existingValues = destinationSourceRangeMaps.get(section) ?? [];
        const numbers = matchedNumbers.map((v) => parseInt(v));
        const firstItem = numbers.at(0);
        const secondItem = numbers.at(1);
        const length = numbers.at(2);
        if (
          firstItem !== undefined &&
          secondItem !== undefined &&
          length !== undefined
        ) {
          existingValues.push([firstItem, secondItem, length]);
        }
        destinationSourceRangeMaps.set(
          section,
          existingValues.concat(existingValues)
        );
      }
    }
  });
  for (const seed of seedsToBePlanted) {
    const soil = getPosition(seed, 'seed-to-soil map:');
    if (soil === undefined) continue;
    const fertilizer = getPosition(soil, 'soil-to-fertilizer map:');
    if (fertilizer === undefined) continue;
    const water = getPosition(fertilizer, 'fertilizer-to-water map:');
    if (water === undefined) continue;
    const light = getPosition(water, 'water-to-light map:');
    if (light === undefined) continue;
    const temperature = getPosition(light, 'light-to-temperature map:');
    if (temperature === undefined) continue;
    const humidity = getPosition(temperature, 'temperature-to-humidity map:');
    if (humidity === undefined) continue;
    const location = getPosition(humidity, 'humidity-to-location map:');
    if (location === undefined) continue;
    locations.push(location);
  }
  return Math.min(...locations);
}

export function day5Part1Attempt3(data: string) {
  const locations =
    data
      .split('\n\n')
      .shift()
      ?.split(':')
      .at(1)
      ?.trim()
      .split(' ')
      .map(Number) ?? [];

  const almanacItems = data
    .split('\n\n')
    .splice(1)
    .map((line) =>
      line
        .split('\n')
        .slice(1)
        .map((numbers) => numbers.split(' ').map(Number))
        .map((numbers) => {
          const destination = numbers.at(0);
          const source = numbers.at(1);
          const range = numbers.at(2);

          if (
            destination === undefined ||
            source === undefined ||
            range === undefined
          )
            throw new Error('Invalid item');

          return {
            destination,
            // Get max range
            range: source + range - 1,
            source,
          };
        })
    );

  const seedLocations = locations.map((seed) => {
    return almanacItems.reduce((curr, items) => {
      const mapping = items.find(
        (map) => curr >= map.source && curr <= map.range
      );
      return mapping !== undefined
        ? mapping.destination + (curr - mapping.source)
        : curr;
    }, seed);
  });

  return Math.min(...seedLocations);
}

export function day5Part2(data: string) {
  //
}
