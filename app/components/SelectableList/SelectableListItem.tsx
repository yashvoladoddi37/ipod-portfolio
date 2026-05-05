import styled, { css } from "styled-components";
import { Unit } from "utils/constants";

import { SelectableListOption } from ".";
import { APP_URL } from "utils/constants/api";
import * as Utils from "utils";

const LabelContainer = styled.div<{ $isCentered?: boolean; $isText?: boolean }>`
  flex: 1;
  white-space: ${(props) => (props.$isText ? "normal" : "nowrap")};
  overflow: ${(props) => (props.$isText ? "visible" : "hidden")};
  text-overflow: ${(props) => (props.$isText ? "clip" : "ellipsis")};
  padding-right: ${(props) => (props.$isCentered ? "0" : Unit.MD)};
  text-align: ${(props) => (props.$isCentered ? "center" : props.$isText ? "justify" : "left")};
`;

const Label = styled.h3<{ $isText?: boolean }>`
  margin: 0;
  padding: ${Unit.XXS};
  font-size: ${(props) => (props.$isText ? "16px" : "14px")};
  white-space: ${(props) => (props.$isText ? "normal" : "nowrap")};
  overflow: ${(props) => (props.$isText ? "visible" : "hidden")};
  text-overflow: ${(props) => (props.$isText ? "clip" : "ellipsis")};
  color: #1a1a1a;
  font-family: 'Ranade', 'FK Grotesk', -apple-system, BlinkMacSystemFont,
    system-ui, sans-serif;
  font-weight: ${(props) => (props.$isText ? "500" : "400")};
  letter-spacing: 0.02em;
  line-height: ${(props) => (props.$isText ? "1.6" : "1.2")};
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

const Container = styled.div<{ $isActive?: boolean; $isCentered?: boolean; $isSelectable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isCentered ? "center" : "flex-start")};
  padding: ${Unit.XS} ${Unit.MD};

  ${(props) =>
    props.$isActive &&
    props.$isSelectable !== false &&
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
  isCentered?: boolean;
}

const SelectableListItem = ({ option, isActive, isCentered }: Props) => {
  const isText = option.type === "text";
  const isSelectable = option.type !== "text" || (option as any).selectable;

  return (
    <Container $isActive={isActive} $isCentered={isCentered} $isSelectable={isSelectable}>
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
      <LabelContainer $isCentered={isCentered} $isText={isText}>
        <Label $isText={isText}>{option.label}</Label>
        {option.sublabel && <Sublabel>{option.sublabel}</Sublabel>}
      </LabelContainer>
      {isActive && !isCentered && isSelectable && <Icon src={`${APP_URL}/arrow_right.svg`} />}
    </Container>
  );
};

export default SelectableListItem;
