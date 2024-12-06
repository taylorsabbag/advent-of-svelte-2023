import Day1 from "./2024/Day1.svelte";

type Solution = typeof Day1;

type SolutionMap = {
    [year: string]: {
        [day: number]: Solution;
    };
};

export const solutions: SolutionMap = {
    "2024": {
        1: Day1
    }
}; 