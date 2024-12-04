import { Day } from "../day.ts";

function split(text: string): string[][] {
  let splitText = text.split(/\r?\n/);
  if (splitText[splitText.length - 1] == "") {
    splitText.pop();
  }
  splitText.unshift('.'.repeat(splitText[0].length))
  splitText.push('.'.repeat(splitText[0].length))
  return splitText.map((line) => `.${line}.`).map((line) => line.split(''));
}

type Coordinate = {
  row: number,
  col: number,
}

function add_coordinates(coordinate1: Coordinate, coordinate2: Coordinate): Coordinate {
  return {row: coordinate1.row + coordinate2.row, col: coordinate1.col+coordinate2.col};
}

function findChar(split: string[][], char: string): Coordinate[] {
  return split.reduce((accumulator: Coordinate[], current, rowIndex) => {
    return [...accumulator,
      ...current.reduce((lineAccumulator: Coordinate[], currentLine, colIndex) => {
        if (currentLine !== char) {
          return lineAccumulator;
        }
        return [...lineAccumulator, {row: rowIndex, col: colIndex}]
      }, [])]
  }, [])
}

const SEARCH_VECTORS: Coordinate[] = [
  {row: -1, col: 0},
  {row: -1, col: 1},
  {row: 0, col: 1},
  {row: 1, col: 1},
  {row: 1, col: 0},
  {row: 1, col: -1},
  {row: 0, col: -1},
  {row: -1, col: -1},
];

const LETTERS = ['X', 'M', 'A', 'S'];

function search(input: string[][], start_coordinate: Coordinate, vector: Coordinate, letter_index: number): boolean{
  if (input[start_coordinate.row][start_coordinate.col] !== LETTERS[letter_index]) {
    return false;
  }
  if (letter_index === LETTERS.length - 1) {
    return true;
  }
  return search(input, add_coordinates(start_coordinate, vector), vector, letter_index + 1);
}

function part1(): number {
  const day4input = Deno.readTextFileSync("input/day4.txt");
  const _example_input =
    `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  const inputsplit = split(day4input);
  const xes = findChar(inputsplit, 'X');
  return xes.reduce((accumulator, coordinate: Coordinate) => {
    return accumulator + SEARCH_VECTORS.reduce((inneraccumulator, vector) => {
      if (search(inputsplit, coordinate, vector, 0)) {
        inneraccumulator += 1;
      }
      return inneraccumulator;
    }, 0);
  }, 0);
}

const SEARCH_VECTORS_DIAGONAL: Coordinate[] = [
  {row: -1, col: 1},
  {row: 1, col: 1},
  {row: 1, col: -1},
  {row: -1, col: -1},
];

function part2(): number {
  const day4input = Deno.readTextFileSync("input/day4.txt");
  const _example_input =
    `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  const inputsplit = split(day4input);
  const xes = findChar(inputsplit, 'M');
  const coordinates = xes.reduce<Coordinate[]>((accumulator, coordinate: Coordinate) => {
    return [...accumulator, ...SEARCH_VECTORS_DIAGONAL.reduce<Coordinate[]>((inneraccumulator, vector) => {
      if (search(inputsplit, coordinate, vector, 1)) {
        inneraccumulator.push(add_coordinates(coordinate, vector))
      }
      return inneraccumulator;
    }, [])];
  }, []);
  const counter: Map<string, number> = new Map();
  coordinates.forEach((coordinate) => {
    counter.set(`${coordinate.row},${coordinate.col}`, (counter.get(`${coordinate.row},${coordinate.col}`) ?? 0) + 1);
  });
  let result = 0;
  counter.forEach((value) => {
    if (value >= 2) {
      result += 1;
    }
  });
  return result;
}

export const day4: Day = {
  part1: part1,
  part2: part2,
};
