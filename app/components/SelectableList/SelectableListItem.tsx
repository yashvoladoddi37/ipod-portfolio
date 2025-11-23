import styled, { css } from "styled-components";
import { Unit } from "utils/constants";

import { SelectableListOption } from ".";
import { APP_URL } from "utils/constants/api";
import * as Utils from "utils";

const LabelContainer = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: ${Unit.MD};
`;

const Label = styled.h3`
  margin: 0;
  padding: ${Unit.XXS};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1a1a1a;
  font-family: 'Ranade', 'FK Grotesk', -apple-system, BlinkMacSystemFont,
    system-ui, sans-serif;
  font-weight: 400;
  letter-spacing: 0.02em;
`;

const Sublabel = styled.h3`
  padding: 0 ${Unit.XXS} ${Unit.XXS};
  margin: -4px 0 0 0;
  font-weight: normal;
  font-size: 12px;
  color: #4a4a4a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Container = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  overflow: auto;

  ${(props) =>
    props.$isActive &&
    css`
      ${LabelContainer} {
        padding-right: 0;
      }

      ${Label}, ${Sublabel} {
        color: white;
      }
      background: linear-gradient(135deg, #444444 0%, #666666 100%);
    `};
`;

const Image = styled.img`
  height: 3rem;
  width: 3rem;
  margin-right: ${Unit.XXS};
`;

const Icon = styled.img`
  margin-left: auto;
`;

interface Props {
  option: SelectableListOption;
  isActive: boolean;
}

const SelectableListItem = ({ option, isActive }: Props) => {
  return (
    <Container $isActive={isActive}>
      {option.imageUrl && (
        <Image
          alt="List item"
          src={Utils.encodeImageUrl(option.imageUrl)}
          onError={(e) => {
            console.log('List item image failed to load:', option.imageUrl);
            e.currentTarget.src = Utils.getArtwork(300, undefined);
          }}
        />
      )}
      <LabelContainer>
        <Label>{option.label}</Label>
        {option.sublabel && <Sublabel>{option.sublabel}</Sublabel>}
      </LabelContainer>
      {isActive && <Icon src={`${APP_URL}/arrow_right.svg`} />}
    </Container>
  );
};

export default SelectableListItem;
