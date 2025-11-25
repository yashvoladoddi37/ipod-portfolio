import { useMemo } from "react";

import {
  getConditionalOption,
  SelectableList,
  SelectableListOption,
} from "components";
import { SplitScreenPreview } from "components/previews";
import viewConfigMap, { AboutView } from "components/views";
import {
  useMenuHideView,
  useMusicKit,
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
        label: "About",
        viewId: viewConfigMap.about.id,
        component: () => <AboutView />,
        preview: SplitScreenPreview.Settings,
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
