import { useCallback, useState } from "react";

import { useEventListener, useVolumeHandler, useAudioPlayer } from "hooks";
import styled from "styled-components";
import { Unit } from "utils/constants";

import Scrubber from "./Scrubber";
import TrackProgress from "./TrackProgress";
import VolumeBar from "./VolumeBar";
import { IpodEvent } from "utils/events";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 0 ${Unit.MD} ${Unit.MD};
`;

interface ContainerProps {
  $isHidden: boolean;
}

const MainContainer = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${Unit.XS};
  right: ${Unit.XS};
  transition: transform 0.3s;

  transform: ${(props) => props.$isHidden && "translateX(-110%)"};
`;

const ScrubberContainer = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${Unit.XS};
  right: ${Unit.XS};
  transition: transform 0.3s;

  transform: ${(props) => props.$isHidden && "translateX(110%)"};
`;

const Controls = () => {
  const { volume, active, setEnabled } = useVolumeHandler();
  const { playbackInfo, seekToTime } = useAudioPlayer();
  const [isScrubbing, setIsScrubbing] = useState(false);

  const handleCenterClick = useCallback(() => {
    if (isScrubbing) {
      // Enable the volume controls.
      setEnabled(true);
      setIsScrubbing(false);
    } else {
      // Disable the volume controls.
      setEnabled(false);
      setIsScrubbing(true);
    }
  }, [isScrubbing, setEnabled]);

  // Global seeking functions that work even when scrubber is not active
  const handleGlobalSeekForward = useCallback(() => {
    if (!isScrubbing && playbackInfo.duration > 0) {
      const newTime = Math.min(playbackInfo.currentTime + 5, playbackInfo.duration);
      seekToTime(newTime);
    }
  }, [isScrubbing, playbackInfo.currentTime, playbackInfo.duration, seekToTime]);

  const handleGlobalSeekBackward = useCallback(() => {
    if (!isScrubbing && playbackInfo.duration > 0) {
      const newTime = Math.max(playbackInfo.currentTime - 5, 0);
      seekToTime(newTime);
    }
  }, [isScrubbing, playbackInfo.currentTime, seekToTime]);

  useEventListener<IpodEvent>("centerclick", handleCenterClick);
  useEventListener<IpodEvent>("forwardscroll", handleGlobalSeekForward);
  useEventListener<IpodEvent>("backwardscroll", handleGlobalSeekBackward);

  return (
    <Container>
      <MainContainer $isHidden={isScrubbing}>
        {active && !isScrubbing && <VolumeBar percent={volume * 100} />}
      </MainContainer>
      <MainContainer $isHidden={isScrubbing}>
        <TrackProgress />
      </MainContainer>
      <ScrubberContainer $isHidden={!isScrubbing}>
        <Scrubber isScrubbing={isScrubbing} />
      </ScrubberContainer>
    </Container>
  );
};

export default Controls;
