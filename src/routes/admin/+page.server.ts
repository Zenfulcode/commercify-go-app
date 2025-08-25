import { fail, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, depends }) => {
	const { commercify } = locals;

	try {
		const result = await commercify.dashboard.getStats();

		if (result.error || !result.data) {
			console.error('Failed to load dashboard stats:', result.error);
			return fail(500, 'Failed to load dashboard stats');
		}

		console.log('Dashboard stats loaded:', result);

		return {
			stats: result.data
		};
	} catch (err) {
		error(500, 'Failed to load dashboard stats');
	}
};
