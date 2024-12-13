import * as Day2024 from "./2024";
import NotFoundSolution from "./NotFoundSolution.svelte";

type SolutionProps = { year: string; day: number };
type Solution = typeof Day2024.Day1 & { props: SolutionProps };

export const solutions: Record<string, Record<number, Solution>> = {
	"2024": Object.fromEntries(
		Array.from({ length: 24 }, (_, i) => [
			i + 1,
			Day2024[`Day${i + 1}` as keyof typeof Day2024],
		]),
	),
};

export const getSolution = (year: string, day: number): Solution => {
	return (solutions[year]?.[day] ?? NotFoundSolution) as Solution;
};
