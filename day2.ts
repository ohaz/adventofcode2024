import { Day } from "./day.ts";

function isSafe(f: number[]): boolean {
    const gradient = f.reduce((merged: number[], c, index) => {
      if (index + 1 < f.length) {
        merged.push(f[index+1] - c);
      }
      return merged;
    }, []);
    return (gradient.every((m) => m > 0) || gradient.every((m) => m < 0))
            && !gradient.some((m) => Math.abs(m) < 1 || Math.abs(m) > 3);
  }
  
  function day2p1(): number {
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
        return isSafe(numbers) ? accumulator + 1 : accumulator;
      }, 0);
  }
  
  function generateProblemDampener(f: number[]): number[][] {
    const results = [f];
    for (let i = 0; i < f.length; i++) {
      results.push(f.toSpliced(i, 1));
    }
    return results;
  }
  
  function day2p2(): number {
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
        return generateProblemDampener(numbers).some((entry) => isSafe(entry)) ? accumulator + 1 : accumulator;
      }, 0);
  }

export const day2: Day = {
    part1: day2p1,
    part2: day2p2,
}