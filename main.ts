import { Day } from "./day.ts";
import { day1 } from "./days/day1.ts";
import { day2 } from "./days/day2.ts";
import { day3 } from "./days/day3.ts";
import { day4 } from "./days/day4.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const days: Day[] = [
    day1,
    day2,
    day3,
    day4,
  ];

  days.forEach(
    (day, index) => {
      console.log(`---------- Running day ${index + 1}`);
      console.log(`Part 1: ${day.part1()}`);
      console.log(`Part 2: ${day.part2()}`);
    },
  );
}
