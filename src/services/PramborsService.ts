const getNowPlaying = async () => {
	return fetch(
		'https://np.tritondigital.com/public/nowplaying?mountName=PRAMBORS_FM&numberToFetch=1&eventType=track'
	);
};

const getTop40Asia = async () => {
	return fetch('https://api.mrngroup.co/api/playlist/top-40');
};

const getItunesSongInfo = async ({ term }: { term: string }) => {
	const searchParam = new URLSearchParams({
		term
	});
	return fetch(
		`https://itunes.apple.com/search?country=id&media=music&entity=song&limit=1&lang=en_us&explicit=Yes&version=2&${searchParam}`
	);
};

export default {
	getNowPlaying,
	getTop40Asia,
	getItunesSongInfo
};
