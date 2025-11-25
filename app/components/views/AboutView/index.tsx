import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { useMenuHideView, useScrollHandler } from "hooks";
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
      label: "my pinterest",
      url: "https://in.pinterest.com/mahithamans/",
    },
    {
      type: "link",
      label: "the playlist on spotify",
      url: "https://open.spotify.com/playlist/5d7xgGIsWMEh55d3UlHeN1?si=a6aa39a660be4bc0",
    },
    {
      type: "link",
      label: "this may be of interest to you",
      url: "https://www.shoprecove.com/",
    },
  ];

  const [scrollIndex] = useScrollHandler(viewConfigMap.about.id, options);

  return (
    <Container>
      <ListContainer>
        <TitleContainer>
          <Title>mahitha's birthday ipod</Title>
        </TitleContainer>
        <SelectableList options={options} activeIndex={scrollIndex} />
      </ListContainer>
    </Container>
  );
};

export default AboutView;
