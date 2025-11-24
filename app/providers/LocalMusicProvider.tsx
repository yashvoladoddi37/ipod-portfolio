import { createContext, useCallback, useContext, useRef, useState, useEffect, useMemo } from "react";
import { useSettings } from "hooks";
import { playlistTracks } from "lib/playlistTracks";
import { encodeImageUrl } from "utils";

export interface LocalMusicState {
  isReady: boolean;
  currentTrack?: MediaApi.Song;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export interface LocalMusicActions {
  play: (queueOptions: MediaApi.QueueOptions) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  skipNext: () => Promise<void>;
  skipPrevious: () => Promise<void>;
  seekToTime: (time: number) => void;
  setVolume: (volume: number) => void;
}

export type LocalMusicHook = LocalMusicState & LocalMusicActions;

export const LocalMusicContext = createContext<LocalMusicHook>({} as any);

interface Props {
  children: React.ReactNode;
}

export const LocalMusicProvider = ({ children }: Props) => {
  const { setService } = useSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const [isReady, setIsReady] = useState(false);

  const currentTrack = playlistTracks[currentTrackIndex];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;
    setIsReady(true);

    // Set up event listeners
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      // Advance to the next track using the latest index value
      setCurrentTrackIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % playlistTracks.length;
        return nextIndex;
      });

      // Auto-play the next track after a short delay
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((error) => {
              console.error('Error auto-playing next track:', error);
            });
        }
      }, 500);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      const error = target.error;
      console.error('Audio error:', {
        event: e,
        error: error,
        errorCode: error?.code,
        errorMessage: getMediaErrorMessage(error?.code),
        src: target.src,
        currentTrack: currentTrack?.name,
      });
      setIsPlaying(false);

      // Try to skip to next track if current track fails
      if (error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED ||
          error?.code === MediaError.MEDIA_ERR_DECODE) {
        console.log('Skipping to next track due to format error');
        setTimeout(() => {
          setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlistTracks.length);
        }, 1000);
      }
    };

    const getMediaErrorMessage = (code?: number) => {
      switch (code) {
        case MediaError.MEDIA_ERR_ABORTED:
          return 'Media playback aborted';
        case MediaError.MEDIA_ERR_NETWORK:
          return 'Network error while loading media';
        case MediaError.MEDIA_ERR_DECODE:
          return 'Media decode error - unsupported format';
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          return 'Media source not supported';
        default:
          return 'Unknown media error';
      }
    };

    const handleLoadStart = () => {
      console.log('Loading audio:', currentTrack?.url);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    // Set local as the default service
    setService('local' as any);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.pause();
    };
  }, [setService]);

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      // Encode the URL to handle special characters like # in filenames
      const encodedUrl = encodeImageUrl(currentTrack.url);
      console.log('Setting audio source:', { original: currentTrack.url, encoded: encodedUrl });

      // Reset any previous error state
      audioRef.current.src = '';
      audioRef.current.load();

      // Set the new source
      audioRef.current.src = encodedUrl;
      audioRef.current.load();

      const handleCanPlay = () => {
        console.log('Audio ready to play:', currentTrack.name);
      };

      audioRef.current.addEventListener('canplay', handleCanPlay, { once: true });

      return () => {
        audioRef.current?.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [currentTrack]);

  const play = useCallback(async (queueOptions: MediaApi.QueueOptions) => {
    console.log('LocalMusic play called with:', queueOptions);
    if (!audioRef.current) {
      console.error('Audio ref not available');
      return;
    }

    // Handle different queue options
    if (queueOptions.song) {
      const trackIndex = playlistTracks.findIndex(track => track.id === queueOptions.song!.id);
      console.log('Found track index:', trackIndex, 'for song:', queueOptions.song.name);
      if (trackIndex !== -1) {
        setCurrentTrackIndex(trackIndex);
      }
    } else if (queueOptions.songs && queueOptions.songs.length > 0) {
      const startPosition = queueOptions.startPosition || 0;
      console.log('Playing from songs list, start position:', startPosition);
      setCurrentTrackIndex(startPosition);
    } else if (queueOptions.startPosition !== undefined) {
      console.log('Playing from start position:', queueOptions.startPosition);
      setCurrentTrackIndex(queueOptions.startPosition);
    }

    // Small delay to allow the React effect that updates the audio src
    // to run after changing currentTrackIndex, then start playback.
    setTimeout(async () => {
      try {
        console.log('Attempting to play audio:', audioRef.current?.src);
        if (audioRef.current) {
          await audioRef.current.play();
          console.log('Audio play successful');
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }, 100);
  }, []);

  const pause = useCallback(async () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Error resuming audio:', error);
      }
    }
  }, []);

  const skipNext = useCallback(async () => {
    // Move to the next track using the latest index value
    setCurrentTrackIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % playlistTracks.length;
      return nextIndex;
    });

    // After updating the index, wait briefly for the src to update, then play.
    setTimeout(() => {
      if (!audioRef.current) {
        return;
      }

      audioRef.current
        .play()
        .catch((error) => {
          console.error('Error playing next track:', error);
        });
    }, 100);
  }, []);

  const skipPrevious = useCallback(async () => {
    // Move to the previous track using the latest index value
    setCurrentTrackIndex((prevIndex) => {
      if (prevIndex === 0) {
        return playlistTracks.length - 1;
      }

      return prevIndex - 1;
    });

    // After updating the index, wait briefly for the src to update, then play.
    setTimeout(() => {
      if (!audioRef.current) {
        return;
      }

      audioRef.current
        .play()
        .catch((error) => {
          console.error('Error playing previous track:', error);
        });
    }, 100);
  }, []);

  const seekToTime = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const contextValue: LocalMusicHook = useMemo(() => ({
    isReady,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    resume,
    skipNext,
    skipPrevious,
    seekToTime,
    setVolume,
  }), [
    isReady,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    resume,
    skipNext,
    skipPrevious,
    seekToTime,
    setVolume,
  ]);

  return (
    <LocalMusicContext.Provider value={contextValue}>
      {children}
    </LocalMusicContext.Provider>
  );
};

export const useLocalMusic = (): LocalMusicHook => {
  const context = useContext(LocalMusicContext);
  if (!context) {
    throw new Error('useLocalMusic must be used within a LocalMusicProvider');
  }
  return context;
};
