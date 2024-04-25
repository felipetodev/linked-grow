import { YoutubeSkeleton } from './youtube-skeleton';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { getVideoId } from './utils';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export function LiteYoutube({ youtubeUrl }: { youtubeUrl: string }) {
  return (
    <>
      {getVideoId(youtubeUrl) ? (
        <div className="max-h-[340px] xl:max-h-[500px]">
          <LiteYouTubeEmbed
            id={getVideoId(youtubeUrl)}
            title="YouTube video preview"
            noCookie={true}
          />
        </div>
      ) : (
        <YoutubeSkeleton />
      )}
    </>
  )
}
