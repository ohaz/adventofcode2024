import { Day } from "./day.ts";

function day1p1(): number {
  const _example_input: string = `3   4
4   3
2   5
1   3
3   9
3   3`;
  const day1input = Deno.readTextFileSync("input/day1.txt");
  const left: number[] = [];
  const right: number[] = [];
  day1input.split(/\r?\n/).forEach(
    (line) => {
      if (line.length <= 0) {
        return;
      }
      const [l, r] = line.split(/\s+/);
      left.push(+l);
      right.push(+r);
    }
  )
  const sortedLeft = left.sort((n1, n2) => n1 - n2);
  const sortedRight = right.sort((n1, n2) => n1 - n2);
  const zip = (a: number[], b: number[]) => a.map((k, i) => [k, b[i]]);
  return zip(sortedLeft, sortedRight).reduce((accumulator, values) => {
      return accumulator + Math.max(...values) - Math.min(...values);
  }, 0);
}

function day1p2(): number {
  const _example_input: string = `3   4
4   3
2   5
1   3
3   9
3   3`;
  const day1input = Deno.readTextFileSync("input/day1.txt");
  const left: number[] = [];
  const right: number[] = [];
  day1input.split(/\r?\n/).forEach(
    (line) => {
      if (line.length <= 0) {
        return;
      }
      const [l, r] = line.split(/\s+/);
      left.push(+l);
      right.push(+r);
    }
  )
  return left.map<number>(
    (value) => value * right.filter(x => x === value).length
  ).reduce(
    (accumulator: number, value: number) => accumulator + value
  )
}

export const day1: Day = {
  part1: day1p1,
  part2: day1p2
}