import { useQuery } from '@sveltestack/svelte-query';
import { z } from 'zod';
import { XMLParser } from 'fast-xml-parser';

import PramborsService from '$/services/PramborsService';

const nowPlayingResponseSchema = z.object({
  'nowplaying-info-list': z.object({
    'nowplaying-info': z.object({
      property: z.tuple([
        z.object({
          value: z.number(),
          name: z.literal('cue_time_duration')
        }),
        z.object({
          value: z.number(),
          name: z.literal('cue_time_start')
        }),
        z.object({
          value: z.string(),
          name: z.literal('cue_title')
        }),
        z.object({
          value: z.string(),
          name: z.literal('program_id')
        }),
        z.object({
          value: z.string(),
          name: z.literal('track_artist_name')
        })
      ]),
      mountName: z.string(),
      timestamp: z.number(),
      type: z.string()
    })
  })
});

type NowPlayingResponse = z.infer<typeof nowPlayingResponseSchema>;

type NowPlaying = {
  cue_time_duration: number;
  cue_time_start: number;
  cue_title: string;
  program_id: string;
  track_artist_name: string;
};

function useQueryNowPlaying() {
  const queryKey = ['now-playing'];

  const queryFn = async () => {
    const response = await PramborsService.getNowPlaying().then((data) => data.text());

    const json: NowPlayingResponse = nowPlayingResponseSchema.parse(
      new XMLParser({
        textNodeName: 'value',
        processEntities: false,
        ignoreAttributes: false,
        attributeNamePrefix: '',
        ignoreDeclaration: true,
        parseAttributeValue: true,
        parseTagValue: true,
        alwaysCreateTextNode: true
      }).parse(response)
    );
    const properties = json['nowplaying-info-list']['nowplaying-info'].property;

    const nowPlaying: NowPlaying = {
      cue_time_duration: properties[0].value,
      cue_time_start: properties[1].value,
      cue_title: properties[2].value,
      program_id: properties[3].value,
      track_artist_name: properties[4].value
    };

    return nowPlaying;
  };

  return useQuery({
    queryKey,
    queryFn,
    refetchInterval: 10 * 1000
  });
}

export default useQueryNowPlaying;
