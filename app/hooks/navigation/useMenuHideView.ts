import { useCallback } from "react";

import { useEventListener, useViewContext } from "hooks";

import { IpodEvent } from "utils/events";

/**
 * A quick way to use the menu button as a back button.
 * Provide an ID that matches the ID of the window you want to close.
 */
const useMenuHideView = (id: string) => {
  const { hideView, viewStack } = useViewContext();

  const handleClick = useCallback(() => {
    const currentId = viewStack[viewStack.length - 1].id;
    if (currentId === id || currentId.startsWith(`${id}-`)) {
      hideView();
    }
  }, [hideView, id, viewStack]);

  useEventListener<IpodEvent>("menuclick", handleClick);
};

export default useMenuHideView;
