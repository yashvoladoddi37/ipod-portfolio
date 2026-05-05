"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAudioPlayer } from "hooks";

const LyricsContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isVisible }) => ($isVisible ? '0' : '-400px')};
  width: 400px;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  color: #e0e0e0;
  font-family: 'Ranade', 'FK Grotesk', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const LyricsHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SongTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  letter-spacing: 0.02em;
`;

const ArtistName = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: #cccccc;
  letter-spacing: 0.01em;
`;

const LyricsContent = styled.div`
  line-height: 1.6;
  font-size: 0.9rem;
  white-space: pre-line;
  color: #e0e0e0;
`;

const NoLyricsMessage = styled.div`
  text-align: center;
  color: #888888;
  font-size: 1rem;
  margin-top: 3rem;
  font-style: italic;
`;

const ToggleButton = styled.button<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'FK Grotesk', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateX(-50%) translateY(-1px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #cccccc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface Props {
  playlistMetadata: any[];
}

const LyricsDisplay = ({ playlistMetadata }: Props) => {
  const { nowPlayingItem } = useAudioPlayer();
  const [isVisible, setIsVisible] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState<string | null>(null);

  // Find lyrics for current song
  useEffect(() => {
    if (nowPlayingItem && playlistMetadata) {
      // Primary: match on stable song_id
      let songData = playlistMetadata.find(
        (song) => song.song_id === nowPlayingItem.id
      );

      // Fallback: for any edge cases where IDs don't align, also try
      // matching by exact name + artist.
      if (!songData) {
        songData = playlistMetadata.find(
          (song) =>
            song.name === nowPlayingItem.name &&
            song.artist === nowPlayingItem.artistName
        );
      }

      if (songData && songData.lyrics) {
        setCurrentLyrics(songData.lyrics);
      } else {
        setCurrentLyrics(null);
      }
    } else {
      setCurrentLyrics(null);
    }
  }, [nowPlayingItem, playlistMetadata]);

  if (!nowPlayingItem) {
    return (
      <ToggleButton $isVisible={false} onClick={() => setIsVisible(!isVisible)}>
        🎵 Lyrics
      </ToggleButton>
    );
  }

  return (
    <>
      <ToggleButton $isVisible={isVisible} onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '✕ Hide' : '🎵 Lyrics'}
      </ToggleButton>
      
      <LyricsContainer $isVisible={isVisible}>
        <CloseButton onClick={() => setIsVisible(false)}>
          ×
        </CloseButton>
        
        <LyricsHeader>
          <SongTitle>{nowPlayingItem.name}</SongTitle>
          <ArtistName>{nowPlayingItem.artistName}</ArtistName>
        </LyricsHeader>

        <LyricsContent>
          {currentLyrics ? (
            currentLyrics
          ) : (
            <NoLyricsMessage>
              No lyrics available for this song
            </NoLyricsMessage>
          )}
        </LyricsContent>
      </LyricsContainer>
    </>
  );
};

export default LyricsDisplay;
