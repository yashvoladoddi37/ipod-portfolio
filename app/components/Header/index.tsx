import BatteryIndicator from "components/BatteryIndicator";
import LoadingIndicator from "components/LoadingIndicator";
import { useAudioPlayer, useViewContext, useSettings } from "hooks";
import styled from "styled-components";
import { APP_URL } from "utils/constants/api";

const Container = styled.div<{ $isBirthdayTheme: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  height: 20px;
  background: ${({ $isBirthdayTheme }) =>
    $isBirthdayTheme
      ? 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)'
      : 'linear-gradient(180deg, #feffff 0%, #b1b6b9 100%)'};
  border-bottom: 1px solid ${({ $isBirthdayTheme }) =>
    $isBirthdayTheme ? '#333333' : '#7995a3'};
  box-sizing: border-box;
`;

const Text = styled.h3<{ $isBirthdayTheme: boolean }>`
  margin: 0;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #1a1a1a;
  font-family: 'Ranade', 'FK Grotesk', -apple-system, BlinkMacSystemFont,
    system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const IconContainer = styled.div`
  display: flex;
`;

const Icon = styled.img`
  max-height: 12px;
  margin-left: 8px;
`;

const StyledBatteryIndicator = styled(BatteryIndicator)`
  margin-left: 8px;
`;

const Header = () => {
  const { headerTitle } = useViewContext();
  const { playbackInfo } = useAudioPlayer();
  const { deviceTheme } = useSettings();

  const { isPlaying, isPaused, isLoading } = playbackInfo;
  const isBirthdayTheme = deviceTheme === 'birthday';

  return headerTitle ? (
    <Container $isBirthdayTheme={isBirthdayTheme}>
      <Text $isBirthdayTheme={isBirthdayTheme}>{headerTitle}</Text>
      <IconContainer>
        {isLoading && (
          <IconContainer>
            <LoadingIndicator size={10} />
          </IconContainer>
        )}
        {isPlaying && !isPaused && <Icon src={`${APP_URL}/play.svg`} />}
        {isPaused && <Icon src={`${APP_URL}/pause.svg`} />}
        <StyledBatteryIndicator />
      </IconContainer>
    </Container>
  ) : null;
};

export default Header;
