import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
    // Get the data from the parent layout
    const parentData = await parent();
    return parentData;
}) satisfies PageLoad; 