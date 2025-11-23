import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  background: linear-gradient(180deg, #b1b5c0 0%, #686e7a 100%);
`;

const SettingsPreview = () => {
  return (
    <Container />
  );
};

export default SettingsPreview;
