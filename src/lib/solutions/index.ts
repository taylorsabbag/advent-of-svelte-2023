import Day1 from "./2024/Day1.svelte";

type SolutionMap = {
    [year: string]: {
        [day: number]: typeof Day1;
    };
};

export const solutions: SolutionMap = {
    "2023": {
        1: Day1
    },
    "2024": {
        1: Day1
    }
}; 