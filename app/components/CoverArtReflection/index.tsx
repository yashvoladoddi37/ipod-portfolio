import React from "react";
import styled from "styled-components";
import { useAudioPlayer, useSettings } from "hooks";
import * as Utils from "utils";

const ReflectionContainer = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: -220px;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 140px;
  opacity: ${({ $show }) => ($show ? 0.4 : 0)};
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
  z-index: -2;
  perspective: 800px;
  overflow: hidden;
`;

const ReflectionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  transform: scaleY(-1) rotateX(75deg) rotateY(0deg);
  transform-origin: bottom center;
  filter: blur(2px) brightness(0.6);
  clip-path: polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%);
  mask: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
  -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
`;

const AnimatedGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  background: radial-gradient(
    ellipse at center bottom,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 40%,
    transparent 80%
  );
  clip-path: polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%);
  animation: floorGlow 4s ease-in-out infinite;

  @keyframes floorGlow {
    0%, 100% { opacity: 0.2; transform: scaleY(-1) rotateX(75deg) scale(1); }
    50% { opacity: 0.4; transform: scaleY(-1) rotateX(75deg) scale(1.02); }
  }
`;

interface Props {
  className?: string;
}

const CoverArtReflection = ({ className }: Props) => {
  const { nowPlayingItem } = useAudioPlayer();
  const { service } = useSettings();

  // Only show reflection when local music is playing
  const shouldShow = service === "local" && !!nowPlayingItem;
  const artworkUrl = Utils.getArtwork(200, nowPlayingItem?.artwork?.url);
  const encodedArtworkUrl = artworkUrl ? Utils.encodeImageUrl(artworkUrl) : artworkUrl;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Reflection image failed to load:', encodedArtworkUrl);
    e.currentTarget.style.display = 'none'; // Hide the reflection if image fails
  };

  return (
    <ReflectionContainer className={className} $show={shouldShow}>
      {shouldShow && encodedArtworkUrl && (
        <>
          <ReflectionImage
            src={encodedArtworkUrl}
            alt="Cover art reflection"
            onError={handleImageError}
          />
          <AnimatedGlow />
        </>
      )}
    </ReflectionContainer>
  );
};

export default CoverArtReflection;
