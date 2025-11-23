import { Ipod } from "components/Ipod";
import { APPLE_DEVELOPER_TOKEN } from "./utils/constants/api";
import fs from 'fs';
import path from 'path';

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const appleAccessToken = APPLE_DEVELOPER_TOKEN ?? "";
  const spotifyCode = searchParams.code;

  // Load playlist metadata
  let playlistMetadata = [];
  try {
    const metadataPath = path.join(process.cwd(), '..', 'playlist-metadata.json');
    const metadataContent = fs.readFileSync(metadataPath, 'utf8');
    playlistMetadata = JSON.parse(metadataContent);
  } catch (error) {
    console.error('Failed to load playlist metadata:', error);
  }

  return (
    <>
      <Ipod
        spotifyCallbackCode={spotifyCode}
        appleAccessToken={appleAccessToken}
        playlistMetadata={playlistMetadata}
      />
    </>
  );
}
