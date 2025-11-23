"use client";
import { memo, useCallback, useState } from "react";
import * as SpotifyUtils from "utils/spotify";
import {
  AudioPlayerProvider,
  SettingsContext,
  SettingsProvider,
  useEffectOnce,
} from "hooks";
import { ClickWheel, ViewManager } from "components";
import LyricsDisplay from "components/LyricsDisplay";
import {
  ScreenContainer,
  ClickWheelContainer,
  Shell,
  Sticker,
  Sticker2,
  Sticker3,
} from "components/Ipod/Styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalMusicProvider } from "providers/LocalMusicProvider";
import CoverArtReflection from "components/CoverArtReflection";
import ViewContextProvider from "providers/ViewContextProvider";
import { useRouter } from "next/navigation";
import { GlobalStyles } from "components/Ipod/GlobalStyles";
import Script from "next/script";

type Props = {
  appleAccessToken: string;
  /**
   * Used when the user is redirected back from Spotify's OAuth flow.
   * This is the code that is used to get the access token.
   */
  spotifyCallbackCode?: string;
  playlistMetadata: any[];
};

const Ipod = ({
  appleAccessToken,
  spotifyCallbackCode,
  playlistMetadata,
}: Props) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);

  const handleCheckSpotifyCallback = useCallback(
    async (code: string) => {
      await SpotifyUtils.handleSpotifyCode(code);

      setIsLoading(false);

      router.replace("/");
    },
    [router]
  );

  useEffectOnce(() => {
    if (spotifyCallbackCode) {
      handleCheckSpotifyCallback(spotifyCallbackCode);
      return;
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <SettingsProvider>
        <ViewContextProvider>
          <LocalMusicProvider>
            <AudioPlayerProvider>
                  <SettingsContext.Consumer>
                    {([{ deviceTheme }]) => (
                      <>
                        <Shell $deviceTheme={deviceTheme}>
                          <Sticker $deviceTheme={deviceTheme} />
                          <Sticker2 $deviceTheme={deviceTheme} />
                          <Sticker3 $deviceTheme={deviceTheme} />
                          <ScreenContainer $deviceTheme={deviceTheme}>
                            <ViewManager />
                          </ScreenContainer>
                          <ClickWheelContainer>
                            <ClickWheel />
                          </ClickWheelContainer>
                          <CoverArtReflection />
                        </Shell>
                        <LyricsDisplay playlistMetadata={playlistMetadata} />
                      </>
                    )}
                  </SettingsContext.Consumer>
                </AudioPlayerProvider>
          </LocalMusicProvider>
        </ViewContextProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
};

export default memo(Ipod);
