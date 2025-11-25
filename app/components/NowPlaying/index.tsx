import { useCallback } from "react";

import { Controls } from "components";
import { useAudioPlayer, useEffectOnce, useMKEventListener } from "hooks";
import styled from "styled-components";
import { Unit } from "utils/constants";
import * as Utils from "utils";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
`;

const MetadataContainer = styled.div`
  display: flex;
  height: 70%;
  padding: 0 ${Unit.XS};
`;

interface ArtworkContainerProps {
  $isHidden?: boolean;
}

const ArtworkContainer = styled.div<ArtworkContainerProps>`
  height: 8em;
  width: 8em;
  margin: auto ${Unit.SM};
  -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));
  transform-style: preserve-3d;
  perspective: 500px;
  opacity: ${(props) => props.$isHidden && 0};
`;

const Artwork = styled.img`
  height: 100%;
  width: 100%;
  transform: rotateY(18deg);
  border: 1px solid #f3f3f3;
  border-radius: 4px;
  box-shadow:
    0 10px 18px rgba(0, 0, 0, 0.22),
    0 0 24px rgba(255, 255, 255, 0.65);

  &[src=""], &:not([src]) {
    background: linear-gradient(135deg, #333 0%, #555 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: "♪";
      font-size: 2rem;
      color: #999;
    }
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  margin: auto 0 auto clamp(0.5rem, 5vw, 0.5rem);
`;

const Text = styled.h3`
  margin: 0 0 8px 0;
  font-size: 0.92rem;
  color: #000000;
  font-family: 'Ranade', 'FK Grotesk', -apple-system, BlinkMacSystemFont,
    system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.2;
`;

const Subtext = styled(Text)`
  color: #333333;
  font-size: 0.75rem;
  margin: 0 0 6px 0;
  font-weight: 600;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30%;
`;

interface Props {
  hideArtwork?: boolean;
  onHide: () => void;
}

const NowPlaying = ({ hideArtwork, onHide }: Props) => {
  const { nowPlayingItem, updateNowPlayingItem, updatePlaybackInfo } =
    useAudioPlayer();

  const handlePlaybackChange = useCallback(
    ({ state }: { state: MusicKit.PlaybackStates }) => {
      /** Hide the now playing view if the playback state is "Completed" */
      if (state === MusicKit.PlaybackStates.completed) {
        onHide();
      }
    },
    [onHide]
  );

  useEffectOnce(() => {
    updateNowPlayingItem();
    updatePlaybackInfo();
  });

  useMKEventListener("playbackStateDidChange", handlePlaybackChange);

  const artworkUrl = Utils.getArtwork(300, nowPlayingItem?.artwork?.url);
  const encodedArtworkUrl = artworkUrl ? Utils.encodeImageUrl(artworkUrl) : artworkUrl;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Image failed to load:', encodedArtworkUrl);
    e.currentTarget.src = Utils.getArtwork(300, undefined); // Use default artwork
  };

  return (
    <Container>
      <MetadataContainer>
        <ArtworkContainer $isHidden={hideArtwork}>
          <Artwork
            src={encodedArtworkUrl}
            onError={handleImageError}
            alt={nowPlayingItem?.name || 'Album artwork'}
          />
        </ArtworkContainer>
        <InfoContainer>
          <Text>{nowPlayingItem?.name}</Text>
          <Subtext>{nowPlayingItem?.artistName}</Subtext>
          <Subtext>{nowPlayingItem?.albumName}</Subtext>
        </InfoContainer>
      </MetadataContainer>
      <ControlsContainer>
        <Controls />
      </ControlsContainer>
    </Container>
  );
};

export default NowPlaying;
