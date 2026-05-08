import { SelectableListOption } from "components/SelectableList";
import { DEFAULT_ARTWORK_URL } from "utils/constants/api";

/** Accepts a url with '{w}' and '{h}' and replaces them with the specified size */
export const getArtwork = (size: number | string, url?: string) => {
  if (!url) {
    return DEFAULT_ARTWORK_URL;
  }

  const urlWithSize = url.replace("{w}", `${size}`).replace("{h}", `${size}`);
  return urlWithSize;
};

/** Properly encode URLs for images with special characters */
export const encodeImageUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Split the URL into path and filename
  const parts = url.split('/');
  const filename = parts.pop();
  const path = parts.join('/');

  if (!filename) return url;

  // Encode the filename part only, preserving the path structure
  const encodedFilename = encodeURIComponent(filename);
  return `${path}/${encodedFilename}`;
};

export const setDocumentSongTitle = (song?: any) => {
  document.title = song
    ? `${song.attributes?.name ?? "Music"} - iPod.js`
    : "iPod.js";
};

/** Returns a list of playback options to display in a popup for an album, song, or playlist. */
export const getMediaOptions = (
  type: "album" | "song" | "playlist",
  id: string
): SelectableListOption[] => {
  // Safeguard: if MusicKit is not available (e.g. local-only playback),
  // Don't crash the UI. Just return no extra media options.
  if (typeof window === "undefined" || !(window as any).MusicKit) {
    return [];
  }

  const music = (window as any).MusicKit.getInstance?.();

  if (!music) {
    return [];
  }

  return [
    {
      type: "action",
      label: "Play Next",
      onSelect: () =>
        music.playNext({
          [type]: id,
        }),
    },
    {
      type: "action",
      label: "Play Later",
      onSelect: () =>
        music.playLater({
          [type]: id,
        }),
    },
  ];
};

export const formatPlaybackTime = (seconds: number) => {
  const dateObject = new Date();
  dateObject.setMinutes(0);
  dateObject.setSeconds(seconds);
  const formattedMinutes = dateObject.getMinutes().toString().padStart(2, "0");
  const formattedSeconds = dateObject.getSeconds().toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 *
 * [Client-side only] Returns the root URL of the app, depending on the environment
 */
export const getRootAppUrl = () => {
  const isDev = process.env.NODE_ENV === "development";

  const protocol = isDev ? "http" : "https";
  const rootUrl = isDev ? `localhost:3000` : process.env.VERCEL_BASE_URL;

  return `${protocol}://${rootUrl}`;
};
