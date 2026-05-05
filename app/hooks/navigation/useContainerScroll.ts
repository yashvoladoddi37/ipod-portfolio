import { useCallback, useRef } from "react";
import { useEventListener, useViewContext } from "hooks";
import { IpodEvent } from "utils/events";

/**
 * A hook that allows scrolling a container div using the iPod clickwheel.
 * @param id The view ID to check if this view is active.
 * @param scrollSpeed The number of pixels to scroll per wheel tick.
 */
export const useContainerScroll = (id: string, scrollSpeed: number = 30) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewStack } = useViewContext();

  const handleScroll = useCallback((direction: 'forward' | 'backward') => {
    const currentView = viewStack[viewStack.length - 1];
    const isActive = currentView?.id === id || currentView?.id?.startsWith(`${id}-`);
    
    if (!isActive || !containerRef.current) return;

    const delta = direction === 'forward' ? scrollSpeed : -scrollSpeed;
    containerRef.current.scrollTop += delta;
  }, [id, scrollSpeed, viewStack]);

  const handleForward = useCallback(() => handleScroll('forward'), [handleScroll]);
  const handleBackward = useCallback(() => handleScroll('backward'), [handleScroll]);

  useEventListener<IpodEvent>("forwardscroll", handleForward);
  useEventListener<IpodEvent>("backwardscroll", handleBackward);

  return containerRef;
};

export default useContainerScroll;
