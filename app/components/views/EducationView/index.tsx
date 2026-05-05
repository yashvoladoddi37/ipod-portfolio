"use client";
import { useMemo } from "react";
import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { education } from "lib/resumeData";
import { useMenuHideView, useScrollHandler } from "hooks";
import styled from "styled-components";
import { Unit } from "utils/constants";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${Unit.LG} ${Unit.MD} 0;
`;

const College = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: #000;
  line-height: 1.3;
`;

const Degree = styled.h3`
  margin: ${Unit.SM} 0;
  font-size: 1rem;
  font-weight: 600;
  color: #444;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: ${Unit.MD};
`;

const LabelText = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const ValueText = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const EducationView = () => {
  useMenuHideView(viewConfigMap.education.id);

  const options: SelectableListOption[] = useMemo(() => [
    {
      type: "text",
      label: (
        <ContentContainer>
          <College>{education.college}</College>
          <Degree>{education.degree}</Degree>
        </ContentContainer>
      ),
      selectable: false,
    },
    {
      type: "text",
      label: (
        <MetaItem>
          <LabelText>Duration</LabelText>
          <ValueText>{education.duration}</ValueText>
        </MetaItem>
      ),
      selectable: false,
    },
    {
      type: "text",
      label: (
        <MetaItem style={{ marginBottom: Unit.LG }}>
          <LabelText>Performance</LabelText>
          <ValueText>CGPA: {education.cgpa}</ValueText>
        </MetaItem>
      ),
      selectable: false,
    },
  ], []);

  const [scrollIndex] = useScrollHandler(viewConfigMap.education.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default EducationView;
