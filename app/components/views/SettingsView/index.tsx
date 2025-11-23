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
  useSpotifySDK,
} from "hooks";

const SettingsView = () => {
  useMenuHideView(viewConfigMap.settings.id);
  const {
    isSpotifyAuthorized,
    service,
    deviceTheme,
    setDeviceTheme,
  } = useSettings();
  const { signOut: signOutSpotify, signIn: signInWithSpotify } =
    useSpotifySDK();

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
      /** Show Spotify sign-in/sign-out if desired. */
      ...getConditionalOption(!isSpotifyAuthorized, {
        type: "actionSheet",
        id: viewConfigMap.signinPopup.id,
        label: "Sign in to Spotify",
        listOptions: [
          {
            type: "action",
            label: "Spotify",
            onSelect: signInWithSpotify,
          },
        ],
        preview: SplitScreenPreview.Music,
      }),
      ...getConditionalOption(isSpotifyAuthorized, {
        type: "actionSheet",
        id: viewConfigMap.signOutPopup.id,
        label: "Sign out of Spotify",
        listOptions: [
          {
            type: "action",
            label: "Spotify",
            onSelect: signOutSpotify,
          },
        ],
        preview: SplitScreenPreview.Service,
      }),
    ],
    [
      service,
      signInWithSpotify,
      deviceTheme,
      isSpotifyAuthorized,
      signOutSpotify,
      setDeviceTheme,
    ]
  );

  const [scrollIndex] = useScrollHandler(viewConfigMap.settings.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default SettingsView;
