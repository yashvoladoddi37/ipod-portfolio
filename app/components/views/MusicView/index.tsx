import React, { useMemo } from "react";

import { SelectableList, SelectableListOption } from "components";
import { SplitScreenPreview } from "components/previews";
import {
  AlbumsView,
  ArtistsView,
  CoverFlowView,
  NowPlayingView,
  PlaylistsView,
  SearchView,
  viewConfigMap,
} from "components/views";
import {
  useAudioPlayer,
  useMenuHideView,
  useScrollHandler,
  useSettings,
} from "hooks";
import { playlistTracks } from "lib/playlistTracks";
import * as Utils from "utils";

const MusicView = () => {
  const { isAppleAuthorized, service } = useSettings();
  const { nowPlayingItem } = useAudioPlayer();
  useMenuHideView(viewConfigMap.music.id);

  const options: SelectableListOption[] = useMemo(() => {
    const arr: SelectableListOption[] = [];

    // Show songs directly for local music service
    if (service === "local") {
      playlistTracks.forEach((song) => {
        arr.push({
          type: "song",
          label: song.name,
          sublabel: `${song.artistName} • ${song.albumName}`,
          queueOptions: {
            song,
            startPosition: 0,
          },
          imageUrl: Utils.getArtwork(50, song.artwork?.url),
          showNowPlayingView: true,
          longPressOptions: Utils.getMediaOptions("song", song.id),
        });
      });
    }

    // Add standard music options for other services (only if not local)
    if (service !== "local") {
      arr.push(
        {
          type: "view",
          label: "Message Cards",
          viewId: viewConfigMap.coverFlow.id,
          component: () => <CoverFlowView />,
          preview: SplitScreenPreview.Music,
        },
        {
          type: "view",
          label: "Playlists",
          viewId: viewConfigMap.playlists.id,
          component: () => <PlaylistsView />,
          preview: SplitScreenPreview.Music,
        },
        {
          type: "view",
          label: "Artists",
          viewId: viewConfigMap.artists.id,
          component: () => <ArtistsView />,
          preview: SplitScreenPreview.Music,
        },
        {
          type: "view",
          label: "Albums",
          viewId: viewConfigMap.albums.id,
          component: () => <AlbumsView />,
          preview: SplitScreenPreview.Music,
        },
        {
          type: "view",
          label: "Search",
          viewId: viewConfigMap.search.id,
          component: () => <SearchView />,
          preview: SplitScreenPreview.Music,
        }
      );
    }

    if ((isAppleAuthorized || service === "local") && !!nowPlayingItem) {
      arr.push({
        type: "view",
        label: "Now playing",
        viewId: viewConfigMap.nowPlaying.id,
        component: () => <NowPlayingView />,
        preview: SplitScreenPreview.NowPlaying,
      });
    }

    return arr;
  }, [isAppleAuthorized, service, nowPlayingItem]);

  const [scrollIndex] = useScrollHandler(viewConfigMap.music.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default MusicView;
