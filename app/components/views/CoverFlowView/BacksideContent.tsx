import styled from "styled-components";

const COVER_MESSAGES: Record<string, string> = {
  // hang on to your love
  "6KIS5YIZAyeiFNx1aE1OhY": "message 1",

  // kiss of life
  "4ssiCx4MjZW1Rl9VOF0GZL": "message 2",

  // cherish the day
  "22QiTJqDn1BIRSh4mkNJ5w": "message 3",

  // you feat travis scott
  "4qS2KPWvsQzLvRa9oCHw41": "message 4",

  // rich baby daddy
  "1yeB8MUNeLo9Ek1UEpsyz6": "message 5",

  // fashion killa
  "0O3TAouZE4vL9dM5SyxgvH": "message 6",

  // crossfaded
  "2iu60eTIm2py6MaoVMcBAR": "message 7",

  // lookin exotic
  "6Mz7ULRwNSCOdut6M3tNs2": "message 8",

  // something about you
  "1F6nHHDJyTHLgDDFj1ZZDt": "message 9",

  // lasers
  "2vjFTjmvpFjFM01cNdG2ik": "message 10",

  // ego death
  "3Q5cLvkKsHJvYltf8k7HkO": "message 11",

  // control
  "PLAYBOI_CARTI_CONTROL": "message 12",

  // birthday sex
  "16XNk3bVCSHXN1rlwbXtHb": "message 13",

  // wgft
  "0WsC4ETIXyiHDMXRaPMvKe": "message 14",

  // all i know
  "0NWqNXBJTpXbkI5rPWNy3p": "message 15",

  // beep beep
  "3LjZ6PqqXfwkcnLOkgLGKI": "message 16",

  // celibacy
  "578CwfxpfH2HxlENOCHc2n": "message 17",

  // i hate to be alone
  "1jIu9uVVYaP3x09HLjikQ3": "message 18",

  // honey bun
  "1SRYeLTTfFC1nYtIMauYQc": "message 19",

  // smile body pretty face
  "6sJJyjNbhmx69lukYRygR2": "message 20",

  // mami
  "3CiCLeSabMedcyDMIZ12ID": "message 21",

  // come n go
  "2mNGL7mZILSqZHxGboJaO9": "message 22",

  // you da baddest
  "4AFgK4wP1iD5i8BYaLr9Vf": "message 23",
};

const DEFAULT_MESSAGE = "";

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -28%;
  bottom: -50%;
  left: -50%;
  right: -50%;
  border: 1px solid lightgray;
  background: white;
  transform: rotateY(180deg);
`;

const InfoContainer = styled.div`
  max-width: 90%;
  padding: 8px 10px;
  background: linear-gradient(180deg, #6585ad 0%, #789ab3 100%);
  border-radius: 4px;
  text-align: center;
`;

const Text = styled.h3`
  font-size: 13px;
  margin: 0;
  color: white;
  line-height: 1.4;
`;

interface Props {
  albumId: MediaApi.Album["id"];
}

const BacksideContent = ({ albumId }: Props) => {
  const message = COVER_MESSAGES[albumId] ?? DEFAULT_MESSAGE;

  return (
    <Container>
      <InfoContainer>
        <Text>{message}</Text>
      </InfoContainer>
    </Container>
  );
};

export default BacksideContent;
