"use client";
import styled from "styled-components";
import { Unit } from "utils/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${Unit.MD};
  text-align: center;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: ${Unit.SM};
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #333;
`;

interface Props {
  icon: string;
  text: string;
}

const PlaceholderPreview = ({ icon, text }: Props) => (
  <Container>
    <Icon>{icon}</Icon>
    <Text>{text}</Text>
  </Container>
);

export default PlaceholderPreview;
