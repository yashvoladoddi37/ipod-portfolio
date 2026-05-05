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
      label: "My LinkedIn",
      url: "https://www.linkedin.com/in/yashpreet-voladoddi/",
    },
    {
      type: "link",
      label: "My Instagram",
      url: "https://www.instagram.com/yashvoladoddi/",
    },
    {
      type: "link",
      label: "The Project GitHub",
      url: "https://github.com/yashvoladoddi37/ipod-portfolio",
    },
    {
      type: "link",
      label: "My Spotify",
      url: "https://open.spotify.com/user/31k4lduzutgqaoonc3mbgzf6wx3i?si=c668407bce0c4357",
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
          <Title>yashvoladoddi.in</Title>
        </TitleContainer>
        <SelectableList options={options} activeIndex={scrollIndex} />
      </ListContainer>
    </Container>
  );
};

export default AboutView;
