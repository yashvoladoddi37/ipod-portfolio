"use client";
import { useMemo } from "react";
import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { profile } from "lib/resumeData";
import { useMenuHideView, useScrollHandler } from "hooks";
import styled from "styled-components";
import { Unit } from "utils/constants";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Unit.XL} ${Unit.XL} ${Unit.MD};
  text-align: center;
`;

const Photo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${Unit.LG};
  border: 4px solid #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
`;

const Name = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #000;
`;

const TitleText = styled.h3`
  margin: ${Unit.XS} 0 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #007aff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Hint = styled.div`
  font-size: 0.75rem;
  color: #888;
  padding: ${Unit.MD};
  text-align: center;
  font-style: italic;
`;

const ProfileView = () => {
  useMenuHideView(viewConfigMap.profile.id);

  const options: SelectableListOption[] = useMemo(() => [
    {
      type: "text",
      label: (
        <HeaderContainer>
          <Photo src={profile.photoUrl} alt={profile.name} />
          <Name>{profile.name}</Name>
          <TitleText>{profile.title}</TitleText>
        </HeaderContainer>
      ),
      selectable: false,
    },
    {
      type: "text",
      label: profile.summary,
      selectable: false,
    },
    {
      type: "link",
      label: "LinkedIn Profile",
      url: profile.linkedin,
      sublabel: "Open in new tab",
    },
    {
      type: "link",
      label: "GitHub Profile",
      url: profile.github,
      sublabel: "Open in new tab",
    },
    {
      type: "link",
      label: "Email Me",
      url: `mailto:${profile.email}`,
      sublabel: profile.email,
    },
    {
      type: "text",
      label: <Hint>Use the click wheel to scroll and the center button to open links.</Hint>,
      selectable: false,
    }
  ], []);

  const [scrollIndex] = useScrollHandler(viewConfigMap.profile.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default ProfileView;
