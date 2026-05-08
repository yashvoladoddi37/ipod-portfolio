import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { useMenuHideView, useScrollHandler } from "hooks";
import { profile } from "lib/resumeData";
import styled from "styled-components";
import { Unit } from "utils/constants";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Unit.LG} ${Unit.MD} ${Unit.SM};
  margin-bottom: ${Unit.SM};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 900;
`;

const ListContainer = styled.div`
  flex: 1;
`;

const AboutView = () => {
  useMenuHideView(viewConfigMap.about.id);
  const options: SelectableListOption[] = [
    {
      type: "link",
      label: "Resume PDF",
      url: profile.resumeUrl,
    },
    {
      type: "link",
      label: "LinkedIn",
      url: profile.linkedin,
    },
    {
      type: "link",
      label: "GitHub",
      url: profile.github,
    },
    {
      type: "link",
      label: "Portfolio Source",
      url: "https://github.com/yashvoladoddi37/ipod-portfolio",
    },
    {
      type: "link",
      label: "Original iPod Project",
      url: "https://github.com/tvillarete/ipod-classic-js",
    },
  ];

  const [scrollIndex] = useScrollHandler(viewConfigMap.about.id, options);

  return (
    <Container>
      <ListContainer>
        <TitleContainer>
          <Title>Yashpreet Voladoddi</Title>
        </TitleContainer>
        <SelectableList options={options} activeIndex={scrollIndex} />
      </ListContainer>
    </Container>
  );
};

export default AboutView;
