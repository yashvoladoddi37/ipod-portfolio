import React, { useMemo } from "react";

import { useViewContext } from "hooks";
import styled from "styled-components";

import CoverFlow, { AlbumPreview } from "./CoverFlow";
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

  return (
    <Container>
      <CoverFlow albums={albums} />
    </Container>
  );
};

export default CoverFlowView;
