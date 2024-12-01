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
