import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { APP_URL } from "utils/constants/api";
import { useAudioPlayer } from "hooks";

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 1.2em;
  -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent), to(rgba(250, 250, 250, 0.1)));
`;

const ProgressContainer = styled.div<{ $isDraggable?: boolean }>`
  position: relative;
  flex: 1;
  margin: 0 8px;
  cursor: ${({ $isDraggable }) => $isDraggable ? 'pointer' : 'default'};
  border-radius: 4px;
  background: linear-gradient(180deg, #f5f5f5 0%, #dedede 100%);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  overflow: hidden;

  &:hover {
    opacity: ${({ $isDraggable }) => $isDraggable ? '0.8' : '1'};
  }
`;

const Gloss = styled.div`
  position: absolute;
  width: 100%;
  background: url("${APP_URL}/gloss-overlay.svg") repeat-x;
  background-size: contain;
  height: 100%;
`;

interface ProgressProps {
  $percent: number;
  $isTransparent?: boolean;
}

const Progress = styled.div.attrs<ProgressProps>((props) => ({
  // This is the recommended syntax for when things change often.
  style: {
    width: `${props.$percent}%`,
  },
}))<ProgressProps>`
  position: relative;
  height: 100%;
  background: ${({ $isTransparent }) =>
    !$isTransparent && `url("${APP_URL}/gloss-blue.svg") repeat-x`};
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: width 0.1s;
`;

/** The icon that is displayed when scrubbing. */
const Diamond = styled.img`
  position: absolute;
  height: 100%;
  right: -8px;
  filter: brightness(0.85);
`;

interface Props {
  percent: number;
  isScrubber?: boolean;
  onSeek?: (percent: number) => void;
}

const ProgressBar = ({ percent, isScrubber = false, onSeek }: Props) => {
  const { playbackInfo, seekToTime } = useAudioPlayer();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!onSeek && !isScrubber) return;
    setIsDragging(true);
    e.preventDefault();
  }, [onSeek, isScrubber]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (onSeek) {
      onSeek(newPercent);
    } else if (isScrubber && seekToTime && playbackInfo.duration) {
      const newTime = (newPercent / 100) * playbackInfo.duration;
      seekToTime(newTime);
    }
  }, [isDragging, onSeek, isScrubber, seekToTime, playbackInfo.duration]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!onSeek && !isScrubber || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (onSeek) {
      onSeek(newPercent);
    } else if (isScrubber && seekToTime && playbackInfo.duration) {
      const newTime = (newPercent / 100) * playbackInfo.duration;
      seekToTime(newTime);
    }
  }, [onSeek, isScrubber, seekToTime, playbackInfo.duration]);

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const isDraggable = !!(onSeek || isScrubber);

  return (
    <Container>
      <ProgressContainer
        ref={containerRef}
        $isDraggable={isDraggable}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <Gloss />
        <Progress $percent={percent || 0} $isTransparent={!!isScrubber}>
          {isScrubber && <Diamond src={`${APP_URL}/scrubber.svg`} />}
        </Progress>
      </ProgressContainer>
    </Container>
  );
};

export default ProgressBar;
