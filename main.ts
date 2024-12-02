export function day1p1(): number {
  const _: string = `3   4
4   3
2   5
1   3
3   9
3   3`;
  const day1input = Deno.readTextFileSync("input/day1.txt");
  let left: number[] = [];
  let right: number[] = [];
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
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  return zip(sortedLeft, sortedRight).reduce((accumulator, values) => {
    return accumulator + Math.max(...values) - Math.min(...values);
  }, 0);
}

export function day1p2(): number {
  const example_input: string = `3   4
4   3
2   5
1   3
3   9
3   3`;
  const day1input = Deno.readTextFileSync("input/day1.txt");
  let left: number[] = [];
  let right: number[] = [];
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
  return left.map<number>((value) => 
    value * right.filter(x => x === value).length
  ).reduce((accumulator: number, value: number) => accumulator + value)
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export function day2p1(): number {
  const example_input: string = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
  const day2input = Deno.readTextFileSync("input/day2.txt");
  return day2input.split(/\r?\n/).reduce<number>(
    (accumulator, line) => {
      if (line.length <= 0) {
        return accumulator;
      }
      const numbers: number[] = line.split(/(\d+)\s*/).filter((n) => n !== "").map((n) => +n);
      const sorted = Object.assign([], numbers).sort((a, b) => a - b);
      const reverseSorted = Object.assign([], sorted).reverse();
      if (!(arrayEquals(numbers, sorted) || arrayEquals(numbers, reverseSorted))){
        return accumulator;
      }
      const zipped = numbers.reduce((merged: [number, number][], c, index) => {
        if (index + 1 < numbers.length) {
          merged.push([c, numbers[index+1]]);
        }
        return merged;
      }, []);
      return zipped.some((entry) =>
        Math.abs(entry[1] - entry[0]) < 1 || Math.abs(entry[1] - entry[0]) > 3
      ) ? accumulator : accumulator + 1;
    }, 0);
}

export function day2p2(): number {

}

type Day = {
  part1: () => number;
  part2: () => number;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const days: Day[] = [
    {
      part1: day1p1,
      part2: day1p2
    },
    {
      part1: day2p1,
      part2: day2p2,
    }
  ];

  days.forEach(
    (day, index) => {
      console.log(`---------- Running day ${index + 1}`)
      console.log(`Part 1: ${day.part1()}`);
      console.log(`Part 2: ${day.part2()}`);
    }
  )
}
