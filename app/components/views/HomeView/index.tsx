import { useCallback, useMemo } from "react";

import {
  getConditionalOption,
  SelectableList,
  SelectableListOption,
} from "components";
import { SplitScreenPreview } from "components/previews";
import {
  CoverFlowView,
  GamesView,
  MusicView,
  NowPlayingView,
  SettingsView,
  viewConfigMap,
} from "components/views";
import {
  useAudioPlayer,
  useEventListener,
  useScrollHandler,
  useViewContext,
} from "hooks";
import { IpodEvent } from "utils/events";

const strings = {
  nowPlaying: "Now Playing",
};

const HomeView = () => {
  const { nowPlayingItem } = useAudioPlayer();
  const { showView, viewStack } = useViewContext();

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "view",
        label: "Message Cards",
        viewId: viewConfigMap.coverFlow.id,
        component: () => <CoverFlowView />,
        preview: SplitScreenPreview.Music,
      },
      {
        type: "view",
        label: "Music",
        viewId: viewConfigMap.music.id,
        component: () => <MusicView />,
        preview: SplitScreenPreview.Music,
      },
      {
        type: "view",
        label: "Games",
        viewId: viewConfigMap.games.id,
        component: () => <GamesView />,
        preview: SplitScreenPreview.Games,
      },
      {
        type: "view",
        label: "Settings",
        viewId: viewConfigMap.settings.id,
        component: () => <SettingsView />,
        preview: SplitScreenPreview.Settings,
      },
      ...getConditionalOption(!!nowPlayingItem, {
        type: "view",
        label: strings.nowPlaying,
        viewId: viewConfigMap.nowPlaying.id,
        component: () => <NowPlayingView />,
        preview: SplitScreenPreview.NowPlaying,
      }),
    ],
    [nowPlayingItem]
  );

  const [scrollIndex] = useScrollHandler(viewConfigMap.home.id, options);

  const handleIdleState = useCallback(() => {
    const activeView = viewStack[viewStack.length - 1];

    const shouldShowNowPlaying =
      !!nowPlayingItem &&
      activeView.id !== viewConfigMap.nowPlaying.id &&
      activeView.id !== viewConfigMap.coverFlow.id &&
      activeView.id !== viewConfigMap.keyboard.id;

    // Only show the now playing view if we're playing a song and not already on that view.
    if (shouldShowNowPlaying) {
      showView({
        type: "screen",
        id: viewConfigMap.nowPlaying.id,
        component: NowPlayingView,
      });
    }
  }, [nowPlayingItem, showView, viewStack]);

  useEventListener<IpodEvent>("idle", handleIdleState);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default HomeView;
