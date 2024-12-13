import Day1 from "./2024/Day1.svelte";
import NotFoundSolution from "./NotFoundSolution.svelte";

type SolutionProps = { year: string; day: number };
type Solution = typeof Day1 & { props: SolutionProps };

export const solutions: Record<string, Record<number, Solution>> = {
    "2024": {
        1: Day1
    }
};

export const getSolution = (year: string, day: number): Solution => {
    return (solutions[year]?.[day] ?? NotFoundSolution) as Solution;
};

