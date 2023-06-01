import { useQuery } from '@sveltestack/svelte-query';
import { z } from 'zod';

import PramborsService from '$/services/PramborsService';
import { isImageDark } from '$/lib/isImageDark';

export const albumArtResponseSchema = z.object({
	resultCount: z.number(),
	results: z.array(
		z.object({
			artworkUrl100: z.string()
		})
	)
});

type AlbumArtResponse = z.infer<typeof albumArtResponseSchema>;

function useQueryAlbumArt({ song, artist }: { song: string; artist: string }) {
	const queryKey = ['album-art', song, artist];

	const params = {
		term: `${artist} - ${song}`
	};

	const queryFn = async () => {
		const response = await PramborsService.getItunesSongInfo(params).then((data) => data.json());

		const json: AlbumArtResponse = albumArtResponseSchema.parse(response);

		if (json.resultCount === 0) {
			return {
				url: '',
				dark: false
			};
		}

		const url = json.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
		const dark = await isImageDark(url);
		return {
			url,
			dark
		};
	};

	return useQuery({
		queryKey,
		queryFn,
		enabled: song != null && artist != null
	});
}

export default useQueryAlbumArt;
