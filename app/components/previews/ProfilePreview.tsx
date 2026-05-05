"use client";
import styled from "styled-components";
import { Unit } from "utils/constants";
import { profile } from "lib/resumeData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${Unit.MD};
  text-align: center;
  background: linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%);
`;

const Photo = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${Unit.MD};
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
  border: 3px solid #fff;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: #000;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
`;

const Title = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #007aff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const ProfilePreview = () => (
  <Container>
    <Photo src={profile.photoUrl} alt={profile.name} />
    <Name>{profile.name}</Name>
    <Title>{profile.title}</Title>
  </Container>
);

export default ProfilePreview;
