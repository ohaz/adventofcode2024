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

function findX(split: string[][]): Coordinate[] {
  return split.reduce((accumulator: Coordinate[], current, rowIndex) => {
    return [...accumulator,
      ...current.reduce((lineAccumulator: Coordinate[], currentLine, colIndex) => {
        if (currentLine !== 'X') {
          return lineAccumulator;
        }
        return [...lineAccumulator, {row: rowIndex, col: colIndex}]
      }, [])]
  }, [])
}

class SearchVector {
  north: Coordinate = {row: -1, col: 0};
  northwest: Coordinate = {row: -1, col: 1};
  west: Coordinate = {row: 0, col: 1};
  southwest: Coordinate = {row: 1, col: 1};
  south: Coordinate = {row: 1, col: 0};
  southeast: Coordinate = {row: 1, col: -1};
  east: Coordinate = {row: 0, col: -1};
  northeast: Coordinate = {row: -1, col: -1};
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
  const inputsplit = split(_example_input);
  const xes = findX(inputsplit);
  xes.forEach((coordinate: Coordinate) => {
    searchVector()
  })
  return 0;
}


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
  
  return 0;
}

export const day4: Day = {
  part1: part1,
  part2: part2,
};
