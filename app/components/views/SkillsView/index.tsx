"use client";
import { useMemo } from "react";
import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { skills } from "lib/resumeData";
import { useMenuHideView, useScrollHandler } from "hooks";
import styled from "styled-components";
import { Unit } from "utils/constants";

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${Unit.LG} ${Unit.MD} 0;
`;

const CategoryTitle = styled.h3`
  margin: 0 0 ${Unit.MD};
  font-size: 0.95rem;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Unit.SM};
  margin-bottom: ${Unit.MD};
`;

const SkillTag = styled.span`
  font-size: 0.75rem;
  background: #f8f9fa;
  color: #000;
  padding: 6px 12px;
  border-radius: 100px;
  border: 1px solid #e9ecef;
  font-weight: 500;
`;

const SkillsView = () => {
  useMenuHideView(viewConfigMap.skills.id);

  const options: SelectableListOption[] = useMemo(() => 
    skills.map((skillGroup) => ({
      type: "text" as const,
      label: (
        <CategoryContainer>
          <CategoryTitle>{skillGroup.category}</CategoryTitle>
          <SkillList>
            {skillGroup.items.map((skill, i) => (
              <SkillTag key={i}>{skill}</SkillTag>
            ))}
          </SkillList>
        </CategoryContainer>
      ),
      selectable: false,
    })),
  []);

  const [scrollIndex] = useScrollHandler(viewConfigMap.skills.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default SkillsView;
