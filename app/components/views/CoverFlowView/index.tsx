import React, { useCallback, useMemo } from "react";

import { useEventListener, useViewContext } from "hooks";
import styled from "styled-components";

import CoverFlow, { AlbumPreview } from "./CoverFlow";
import { IpodEvent } from "utils/events";
import { playlistTracks } from "lib/playlistTracks";

const Container = styled.div`
  height: 100%;
  flex: 1;
`;

const CoverFlowView = () => {
  const { hideView } = useViewContext();
  const albums = useMemo<AlbumPreview[]>(
    () =>
      playlistTracks.map((track) => ({
        id: track.id,
        name: track.name,
        artistName: track.artistName,
        artwork: track.artwork,
      })),
    []
  );

  const handleMenuClick = useCallback(() => {
    hideView();
  }, [hideView]);

  useEventListener<IpodEvent>("menuclick", handleMenuClick);

  return (
    <Container>
      <CoverFlow albums={albums} />
    </Container>
  );
};

export default CoverFlowView;
