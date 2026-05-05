"use client";
import { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useAudioPlayer, useViewContext } from "hooks";
import viewConfigMap, { NowPlayingView } from "components/views";
import * as Utils from "utils";

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 40px;
  background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  animation: ${slideUp} 0.3s ease-out;
  user-select: none;
  overflow: hidden;
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
`;

const ProgressBar = styled.div<{ $percent: number }>`
  height: 100%;
  background: #007aff;
  width: ${(props) => props.$percent}%;
  transition: width 0.1s linear;
`;

const Thumbnail = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 3px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid #444;
`;

const ThumbnailFallback = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 3px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #333 0%, #555 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
  border: 1px solid #444;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 8px;
  overflow: hidden;
  min-width: 0;
`;

const TrackName = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

const ArtistName = styled.div`
  font-size: 0.6rem;
  font-weight: 400;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  padding: 0;
  transition: background 0.2s;
  font-size: 11px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const PlayPauseButton = styled(ControlButton)`
  font-size: 14px;
  width: 28px;
  height: 28px;
`;

const ListButton = styled(ControlButton)`
  font-size: 12px;
  margin-left: 2px;
`;

const MiniPlayer = () => {
  const { nowPlayingItem, playbackInfo, togglePlayPause, skipNext, skipPrevious } =
    useAudioPlayer();
  const { showView, viewStack } = useViewContext();

  const isOnNowPlaying = viewStack.some(
    (v) => v.id === viewConfigMap.nowPlaying.id
  );

  const openNowPlayingView = useCallback(() => {
    if (!isOnNowPlaying) {
      showView({
        type: "screen",
        id: viewConfigMap.nowPlaying.id,
        component: NowPlayingView,
      });
    }
  }, [isOnNowPlaying, showView]);

  const handleContainerClick = useCallback(() => {
    openNowPlayingView();
  }, [openNowPlayingView]);

  const handlePlayPause = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      togglePlayPause();
    },
    [togglePlayPause]
  );

  const handleSkipPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      skipPrevious();
    },
    [skipPrevious]
  );

  const handleSkipNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      skipNext();
    },
    [skipNext]
  );

  const handleListClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      openNowPlayingView();
    },
    [openNowPlayingView]
  );

  if (!nowPlayingItem || isOnNowPlaying) {
    return null;
  }

  const artworkUrl = Utils.getArtwork(60, nowPlayingItem?.artwork?.url);
  const encodedArtworkUrl = artworkUrl
    ? Utils.encodeImageUrl(artworkUrl)
    : undefined;

  const percent = (playbackInfo.currentTime / playbackInfo.duration) * 100 || 0;

  return (
    <Container onClick={handleContainerClick}>
      {encodedArtworkUrl ? (
        <Thumbnail
          src={encodedArtworkUrl}
          alt={nowPlayingItem.name}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <ThumbnailFallback>♪</ThumbnailFallback>
      )}
      <Info>
        <TrackName>{nowPlayingItem.name}</TrackName>
        <ArtistName>{nowPlayingItem.artistName}</ArtistName>
      </Info>
      <ControlsRow>
        <ControlButton onClick={handleSkipPrev} title="Previous">
          ⏮
        </ControlButton>
        <PlayPauseButton onClick={handlePlayPause} title="Play/Pause">
          {playbackInfo.isPlaying ? "⏸" : "▶"}
        </PlayPauseButton>
        <ControlButton onClick={handleSkipNext} title="Next">
          ⏭
        </ControlButton>
        <ListButton onClick={handleListClick} title="Songs list">
          ☰
        </ListButton>
      </ControlsRow>
      <ProgressBarContainer>
        <ProgressBar $percent={percent} />
      </ProgressBarContainer>
    </Container>
  );
};

export default MiniPlayer;
