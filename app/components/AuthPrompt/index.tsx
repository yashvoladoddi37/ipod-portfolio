import { useState } from "react";

import { useInterval, useMusicKit } from "hooks";
import styled, { css } from "styled-components";
import { Unit } from "utils/constants";
import { APP_URL } from "utils/constants/api";

const RootContainer = styled.div`
  display: grid;
  place-content: center;
  text-align: center;
  height: 100%;
  background: white;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 60px;
  width: 60px;
  margin: auto;
`;

const StyledImg = styled.img<{ $isHidden: boolean }>`
  position: absolute;
  top: 0%;
  left: 0;
  height: 100%;
  width: 100%;
  transition: all 0.5s ease-in-out;

  ${({ $isHidden }) =>
    $isHidden &&
    css`
      opacity: 0;
    `};

  :last-of-type {
    margin-top: -60px;
  }
`;

const Title = styled.h3`
  margin: ${Unit.XS} 0 ${Unit.XXS};
  font-weight: bold;
  font-size: 18px;
`;

const Text = styled.p`
  font-size: 14px;
  margin: 0;
  max-width: 120px;
  color: rgb(100, 100, 100);
`;

interface Props {
  message?: string;
}

const AuthPrompt = ({ message }: Props) => {
  return (
    <RootContainer />
  );
};

export default AuthPrompt;
