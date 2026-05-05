import { useMemo } from "react";

import {
  SelectableList,
  SelectableListOption,
} from "components";
import { SplitScreenPreview } from "components/previews";
import viewConfigMap, { ContactView } from "components/views";
import {
  useMenuHideView,
  useScrollHandler,
  useSettings,
} from "hooks";

const SettingsView = () => {
  useMenuHideView(viewConfigMap.settings.id);
  const {
    deviceTheme,
    setDeviceTheme,
  } = useSettings();

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "view",
        label: "Contact",
        viewId: viewConfigMap.contact.id,
        component: () => <ContactView />,
        preview: SplitScreenPreview.Contact,
      },
      {
        type: "actionSheet",
        id: viewConfigMap.deviceThemeActionSheet.id,
        label: "Device theme",
        listOptions: [
          {
            type: "action",
            isSelected: deviceTheme === "silver",
            label: `Silver ${deviceTheme === "silver" ? "(Current)" : ""}`,
            onSelect: () => setDeviceTheme("silver"),
          },
          {
            type: "action",
            isSelected: deviceTheme === "black",
            label: `Black ${deviceTheme === "black" ? "(Current)" : ""}`,
            onSelect: () => setDeviceTheme("black"),
          },
        ],
        preview: SplitScreenPreview.Theme,
      },
    ],
    [deviceTheme, setDeviceTheme]
  );

  const [scrollIndex] = useScrollHandler(viewConfigMap.settings.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default SettingsView;

