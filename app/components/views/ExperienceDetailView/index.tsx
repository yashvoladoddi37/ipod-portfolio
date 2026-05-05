"use client";
import { useMemo } from "react";
import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { useMenuHideView, useScrollHandler } from "hooks";
import styled from "styled-components";
import { Unit } from "utils/constants";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${Unit.LG} ${Unit.MD} 0;
`;

const Company = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #000;
  line-height: 1.2;
`;

const Role = styled.h3`
  margin: ${Unit.SM} 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const Meta = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: ${Unit.MD};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ExperienceDetailView = ({ experience }: Props) => {
  useMenuHideView(viewConfigMap.experienceDetail.id);

  const options: SelectableListOption[] = useMemo(() => [
    {
      type: "text",
      label: (
        <ContentContainer>
          <Company>{experience.company}</Company>
          <Role>{experience.role}</Role>
          <Meta>
            <span>📅 {experience.duration}</span>
            <span>📍 {experience.location}</span>
          </Meta>
        </ContentContainer>
      ),
      selectable: false,
    },
    ...experience.bullets.map((bullet) => ({
      type: "text" as const,
      label: bullet,
      selectable: false,
    })),
  ], [experience]);

  const [scrollIndex] = useScrollHandler(viewConfigMap.experienceDetail.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

interface Props {
  experience: {
    company: string;
    role: string;
    duration: string;
    location: string;
    bullets: string[];
  };
}

export default ExperienceDetailView;
