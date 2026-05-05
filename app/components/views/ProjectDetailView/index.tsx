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

const Name = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #000;
  line-height: 1.2;
`;

const DescriptionText = styled.h3`
  margin: ${Unit.SM} 0;
  font-size: 1rem;
  font-weight: 600;
  color: #444;
`;

const BulletList = styled.ul`
  padding-left: ${Unit.LG};
  margin: ${Unit.MD} 0;
  border-top: 1px solid #eee;
  padding-top: ${Unit.LG};
`;

const Bullet = styled.li`
  font-size: 0.85rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: ${Unit.MD};
  font-weight: 400;
`;

const Hint = styled.div`
  font-size: 0.75rem;
  color: #888;
  padding: ${Unit.MD};
  text-align: center;
  font-style: italic;
`;

interface Props {
  project: {
    id: string;
    name: string;
    description: string;
    link: string;
    bullets: string[];
  };
}

const ProjectDetailView = ({ project }: Props) => {
  useMenuHideView(viewConfigMap.projectDetail.id);

  const options: SelectableListOption[] = useMemo(() => [
    {
      type: "text",
      label: (
        <ContentContainer>
          <Name>{project.name}</Name>
          <DescriptionText>{project.description}</DescriptionText>
        </ContentContainer>
      ),
      selectable: false,
    },
    ...project.bullets.map((bullet) => ({
      type: "text" as const,
      label: bullet,
      selectable: false,
    })),
    {
      type: "link",
      label: "Visit Project",
      url: project.link,
      sublabel: "Open in new tab",
    },
    {
      type: "text",
      label: <Hint>Use the click wheel to scroll and the center button to open the link.</Hint>,
      selectable: false,
    }
  ], [project]);

  // We need to handle the indexed ID for project detail views
  const [scrollIndex] = useScrollHandler(viewConfigMap.projectDetail.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default ProjectDetailView;
