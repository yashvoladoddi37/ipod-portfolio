import { useEffect, useMemo, useRef, useState } from "react";

import { LoadingIndicator, LoadingScreen } from "components";
import ErrorScreen from "components/ErrorScreen";
import { SplitScreenPreview } from "components/previews";
import { AnimatePresence, motion } from "framer-motion";
import { useTimeout } from "hooks";
import styled from "styled-components";

import SelectableListItem from "./SelectableListItem";

export const getConditionalOption = (
  condition?: boolean,
  option?: SelectableListOption
) => (option && condition ? [option] : []);

export type SelectableListOptionType =
  | "view"
  | "link"
  | "song"
  | "action"
  | "actionSheet"
  | "popup"
  | "text";

type SharedOptionProps = {
  type?: SelectableListOptionType;
  label: React.ReactNode;
  isSelected?: boolean;
  sublabel?: string;
  preview?: SplitScreenPreview;
  imageUrl?: string;
  longPressOptions?: SelectableListOption[];
};

type ViewOptionProps = {
  type: "view";
  /** A unique identifier for the next screen. */
  viewId: string;
  /** The component that will be displayed in the next view. */
  component: React.ReactNode | ((...args: any) => JSX.Element);
  headerTitle?: string;
};

type LinkOptionProps = {
  type: "link";
  url: string;
};

type SongOptionProps = {
  type: "song";
  /** Options that will be used to fetch and play a song. */
  queueOptions: MediaApi.QueueOptions;
  /**
   * Show the Now Playing view after starting the song.
   * @default false
   */
  showNowPlayingView?: boolean;
};

type ActionOptionProps = {
  type: "action";
  onSelect: () => void;
};

export type PopupOptionProps = {
  type: "popup";
  /** A unique identifier for the popup. */
  popupId: string;
  listOptions: SelectableListOption[];
  title: string;
  description?: string;
};

export type ActionSheetOptionProps = {
  type: "actionSheet";
  /** A unique identifier for the action sheet. */
  id: string;
  listOptions: SelectableListOption[];
};

type TextOptionProps = {
  type: "text";
  /** If true, the item can be selected. Useful if you want the text to trigger an action. @default false */
  selectable?: boolean;
};

/** Depending on the option type, certain properties will be available. */
export type SelectableListOption = SharedOptionProps &
  (
    | ViewOptionProps
    | LinkOptionProps
    | SongOptionProps
    | ActionOptionProps
    | ActionSheetOptionProps
    | PopupOptionProps
    | TextOptionProps
  );

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
`;

interface Props {
  options: SelectableListOption[];
  activeIndex: number;
  loading?: boolean;
  loadingNextItems?: boolean;
  emptyMessage?: string;
  centerAlign?: boolean;
}

const SelectableList = ({
  options,
  activeIndex,
  loading,
  loadingNextItems,
  emptyMessage = "Nothing to see here",
  centerAlign = false,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useTimeout(() => setIsMounted(true), 350);

  const fullOptions = useMemo(
    () => [
      ...options,
      // Show a loading indicator when loading more items.
      ...getConditionalOption(loadingNextItems, {
        type: "action",
        label: (
          <LoadingContainer>
            <LoadingIndicator size={16} />
          </LoadingContainer>
        ),
        onSelect: () => {},
      }),
    ],
    [options, loadingNextItems]
  );

  /** Always make sure the selected item is within the screen's view. */
  useEffect(() => {
    if (containerRef.current && fullOptions.length) {
      const container = containerRef.current;
      const { children } = container;
      // The loading indicator is appended to the end of the list, so the index matches.
      const targetIndex = activeIndex;
      const targetElement = children[targetIndex] as HTMLElement;

      if (targetElement) {
        const containerHeight = container.clientHeight;
        const containerScrollTop = container.scrollTop;
        const targetOffsetTop = targetElement.offsetTop;
        const targetHeight = targetElement.clientHeight;

        // Scroll down if the item is below the view
        if (targetOffsetTop + targetHeight > containerScrollTop + containerHeight) {
          container.scrollTop = targetOffsetTop + targetHeight - containerHeight;
        }
        // Scroll up if the item is above the view
        else if (targetOffsetTop < containerScrollTop) {
          container.scrollTop = targetOffsetTop;
        }
      }
    }
  }, [activeIndex, fullOptions.length]);

  return (
    <AnimatePresence>
      {loading ? (
        <LoadingScreen backgroundColor="white" />
      ) : options.length > 0 ? (
        <Container ref={containerRef}>
          {fullOptions.map((option, index) => (
            <SelectableListItem
              key={`option-${option.label}-${index}`}
              option={option}
              isActive={index === activeIndex}
              isCentered={centerAlign}
            />
          ))}
        </Container>
      ) : (
        <ErrorScreen showImage={false} message={emptyMessage} />
      )}
    </AnimatePresence>
  );
};

export default SelectableList;
