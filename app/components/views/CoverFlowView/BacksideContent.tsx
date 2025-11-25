import styled from "styled-components";

const COVER_MESSAGES: Record<string, string> = {
  // hang on to your love
  "6KIS5YIZAyeiFNx1aE1OhY": "sade setting the tone for the whole playlist",

  // kiss of life
  "4ssiCx4MjZW1Rl9VOF0GZL":
    "taking you out that night felt like living inside 'chungking express', one of my favorite movies",

  // cherish the day
  "22QiTJqDn1BIRSh4mkNJ5w":
    "good things are already on their way to you, even when it feels quiet",

  // you feat travis scott
  "4qS2KPWvsQzLvRa9oCHw41":
    "one day you'll look back and realise this version of you was the start of everything",

  // rich baby daddy
  "1yeB8MUNeLo9Ek1UEpsyz6":
    "you are building a life where money feels light, abundant and fully yours",

  // fashion killa
  "0O3TAouZE4vL9dM5SyxgvH": "your pinterest boards always knew you were that girl before you did",

  // crossfaded
  "2iu60eTIm2py6MaoVMcBAR":
    "you and me in the backseat, buzzed, lighting a joint in the parking lot, crossfaded",

  // lookin exotic
  "6Mz7ULRwNSCOdut6M3tNs2": "you do look exotic",

  // something about you
  "1F6nHHDJyTHLgDDFj1ZZDt": "top 3 nonchalant women award goes to you, first two go to my sisters",

  // lasers
  "2vjFTjmvpFjFM01cNdG2ik": "you're allowed to be dramatic about your dreams, they're big enough to handle it",

  // ego death
  "3Q5cLvkKsHJvYltf8k7HkO":
    "me putting my ego aside long enough to make you a whole website",

  // control
  "PLAYBOI_CARTI_CONTROL":
    "you do not chase, you attract and your standards stay high",

  // birthday sex
  "16XNk3bVCSHXN1rlwbXtHb": "you cannot blame me for putting this one here",

  // wgft
  "0WsC4ETIXyiHDMXRaPMvKe": "money, opportunities and peace will find you easily this year",

  // all i know
  "0NWqNXBJTpXbkI5rPWNy3p":
    "you're allowed to want more and still be grateful for what you have",

  // beep beep
  "3LjZ6PqqXfwkcnLOkgLGKI":
    "you are moving toward the life you want faster than you realise",

  // celibacy
  "578CwfxpfH2HxlENOCHc2n":
    "the version of you you keep pinning on pinterest is already here",

  // i hate to be alone
  "1jIu9uVVYaP3x09HLjikQ3":
    "you're exactly on time for your own life",

  // honey bun
  "1SRYeLTTfFC1nYtIMauYQc":
    "you move like someone who knows she always lands on her feet",

  // smile body pretty face
  "6sJJyjNbhmx69lukYRygR2":
    "i like your frog eyes too, they're very distinctive",

  // mami
  "3CiCLeSabMedcyDMIZ12ID":
    "also you don't have trash music taste, i was just trying to be nonchalant",

  // come n go
  "2mNGL7mZILSqZHxGboJaO9":
    "your body your sleep and your skin keep getting better even when life is loud",

  // you da baddest
  "4AFgK4wP1iD5i8BYaLr9Vf":
    "you really are da baddest, even if you forget it for a minute",
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
