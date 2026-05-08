import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.6; }
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.35);
`;

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    window.addEventListener("forwardscroll", hide);
    window.addEventListener("backwardscroll", hide);
    window.addEventListener("centerclick", hide);
    window.addEventListener("menuclick", hide);
    window.addEventListener("forwardclick", hide);
    window.addEventListener("backwardclick", hide);
    window.addEventListener("playpauseclick", hide);
    return () => {
      window.removeEventListener("forwardscroll", hide);
      window.removeEventListener("backwardscroll", hide);
      window.removeEventListener("centerclick", hide);
      window.removeEventListener("menuclick", hide);
      window.removeEventListener("forwardclick", hide);
      window.removeEventListener("backwardclick", hide);
      window.removeEventListener("playpauseclick", hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <Wrapper>
      <Label>Scroll to navigate</Label>
    </Wrapper>
  );
};

export default ScrollIndicator;
