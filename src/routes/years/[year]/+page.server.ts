import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface DayEntry {
    day: number;
    title: string;
    content: string;
}

function parseChallenges(html: string): DayEntry[] {
    const challenges: DayEntry[] = [];
    const detailsPattern = /<details[^>]*>\s*<summary[^>]*><span[^>]*>Day (\d+) - ([^<]+)<\/span>/g;
    
    let match: RegExpExecArray | null;
    while (true) {
        match = detailsPattern.exec(html);
        if (match === null) break;
        
        const day = Number.parseInt(match[1], 10);
        const title = match[2].trim();
        
        const bodyStart = html.indexOf('<div class="text-left', match.index);
        const bodyEnd = html.indexOf('</div>', bodyStart);
        const content = html.slice(bodyStart, bodyEnd + 6);
        
        challenges.push({
            day,
            title: title.toLowerCase().replace(/\s+/g, "-"),
            content
        });
    }

    return challenges;
}

export const load = (async ({ params, fetch }) => {
    const { year } = params;
    
    if (year !== "2023" && year !== "2024") {
        throw error(400, "Invalid year: Only years 2023 and 2024 are supported");
    }

    try {
        const response = await fetch("https://advent.sveltesociety.dev/2023", {
            headers: {
                "Accept": "text/html",
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!response.ok) {
            if (year === "2024") {
                return { days: [] };
            }
            throw error(response.status, `Failed to fetch from Advent of Svelte: ${response.statusText}`);
        }
        
        const html = await response.text();
        const days = parseChallenges(html);
        
        if (days.length === 0) {
            return { days: [] };
        }

        return { days: days.sort((a, b) => a.day - b.day) };
    } catch (err) {
        console.error("Error loading challenges:", err);
        throw error(500, "Failed to load challenges");
    }
}) satisfies PageServerLoad; 