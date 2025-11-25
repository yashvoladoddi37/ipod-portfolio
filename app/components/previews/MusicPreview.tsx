import { useMemo } from "react";

import { KenBurns } from "components";
import { motion } from "framer-motion";
import styled from "styled-components";
import { previewSlideRight } from "animation";
import { localTracks } from "lib/playlistTracks";

const Container = styled(motion.div)`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MusicPreview = () => {
  const artworkUrls = useMemo(
    () => localTracks.map((track) => track.cover).filter((url): url is string => !!url),
    []
  );

  return (
    <Container {...previewSlideRight}>
      <KenBurns urls={artworkUrls} />
    </Container>
  );
};

export default MusicPreview;
