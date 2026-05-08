"use client";
import { memo, useState } from "react";
import {
  AudioPlayerProvider,
  SettingsContext,
  SettingsProvider,
  useEffectOnce,
} from "hooks";
import { ClickWheel, ViewManager } from "components";
import {
  ScreenContainer,
  ClickWheelContainer,
  Shell,
  Sticker,
  Sticker2,
  Sticker3,
  ViewArea,
} from "components/Ipod/Styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalMusicProvider } from "providers/LocalMusicProvider";
import CoverArtReflection from "components/CoverArtReflection";
import ViewContextProvider from "providers/ViewContextProvider";
import { GlobalStyles } from "components/Ipod/GlobalStyles";
import InputIndicator from "components/InputIndicator";
import MiniPlayer from "components/MiniPlayer";
import ScrollIndicator from "components/ClickWheel/ScrollIndicator";

type Props = {
  appleAccessToken: string;
  playlistMetadata: any[];
};

const Ipod = ({
  playlistMetadata: _playlistMetadata,
}: Props) => {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffectOnce(() => {
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <InputIndicator />
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
                            <ViewArea>
                              <ViewManager />
                            </ViewArea>
                            <MiniPlayer />
                          </ScreenContainer>
                          <ScrollIndicator />
                          <ClickWheelContainer>
                            <ClickWheel />
                          </ClickWheelContainer>
                          <CoverArtReflection />
                        </Shell>
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

