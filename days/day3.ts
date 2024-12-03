import { Day } from "../day.ts";

function mul(text: string): number {
  const parsed = text.matchAll(/(mul\((\d+),(\d+)\))/gm);
  return parsed.reduce((accumulator, entry) => {
    accumulator += +entry[2] * +entry[3];
    return accumulator;
  }, 0);
}

function part1(): number {
  const day3input = Deno.readTextFileSync("input/day3.txt");
  const _example_input =
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
  return mul(day3input);
}

type dodont = "do()" | "don't()";

function part2(): number {
  const day3input = Deno.readTextFileSync("input/day3.txt");
  const _example_input =
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
  const input = day3input;
  let dostring: string = "";
  let currentIndex: number = 0;
  let currentType: dodont = "do()";
  while (currentIndex < input.length) {
    const nextCommand: dodont = currentType == "do()" ? "don't()" : "do()";
    const nextIndex = input.indexOf(nextCommand, currentIndex);
    const slice = input.slice(
      currentIndex,
      nextIndex > 0 ? nextIndex : input.length,
    );
    if (nextCommand === "don't()") {
      dostring = dostring.concat(slice);
    }
    currentIndex = nextIndex > 0
      ? nextIndex + nextCommand.length
      : input.length;
    currentType = nextCommand;
  }
  return mul(dostring);
}

export const day3: Day = {
  part1: part1,
  part2: part2,
};
