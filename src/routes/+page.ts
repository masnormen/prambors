import type { PageLoad } from './$types';
import { z } from 'zod';
import PramborsService from '$/services/PramborsService';

const top40ResponseSchema = z.object({
	data: z.object({
		id: z.number(),
		title: z.string(),
		slug: z.string(),
		week: z.number(),
		week_at: z.string(),
		user_id: z.number(),
		user_first_name: z.string(),
		user_last_name: z.string(),
		user_profile_bio: z.string(),
		user_profile_sosmed: z.array(z.any()),
		user_role_name: z.string(),
		items: z.object({
			data: z.array(
				z.object({
					title: z.string(),
					artist: z.string(),
					youtubeLink: z.string(),
					status: z.string(),
					lastWeek: z.number(),
					peak: z.number(),
					duration: z.number(),
					imageAlbum: z.string(),
					news: z.any()
				})
			)
		})
	})
});

export type Top40Response = z.infer<typeof top40ResponseSchema>;

export const load: PageLoad = async ({ fetch }) => {
	const response = await PramborsService.getTop40Asia().then((res) => res.json());
	const json = top40ResponseSchema.parse(response);

	return json;
};
