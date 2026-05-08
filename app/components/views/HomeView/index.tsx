import { useCallback, useMemo } from "react";

import {
  SelectableList,
  SelectableListOption,
} from "components";
import { SplitScreenPreview } from "components/previews";
import {
  ContactView,
  EducationView,
  ExperienceView,
  MusicView,
  NowPlayingView,
  ProfileView,
  ProjectsView,
  SettingsView,
  SkillsView,
  viewConfigMap,
} from "components/views";
import {
  useAudioPlayer,
  useEventListener,
  useScrollHandler,
  useViewContext,
} from "hooks";
import { profile } from "lib/resumeData";
import { IpodEvent } from "utils/events";

const strings = {
  music: "Music",
};

const HomeView = () => {
  const { nowPlayingItem } = useAudioPlayer();
  const { showView, viewStack } = useViewContext();

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "view",
        label: "Profile",
        sublabel: profile.targetRole,
        viewId: viewConfigMap.profile.id,
        component: () => <ProfileView />,
        preview: SplitScreenPreview.Profile,
      },
      {
        type: "view",
        label: "Experience",
        viewId: viewConfigMap.experience.id,
        component: () => <ExperienceView />,
        preview: SplitScreenPreview.Experience,
      },
      {
        type: "view",
        label: "Projects",
        sublabel: "Case studies & demos",
        viewId: viewConfigMap.projects.id,
        component: () => <ProjectsView />,
        preview: SplitScreenPreview.Projects,
      },
      {
        type: "link",
        label: "Resume PDF",
        sublabel: "Open resume",
        url: profile.resumeUrl,
        preview: SplitScreenPreview.Profile,
      },
      {
        type: "view",
        label: "Skills",
        sublabel: "AI, backend, cloud",
        viewId: viewConfigMap.skills.id,
        component: () => <SkillsView />,
        preview: SplitScreenPreview.Skills,
      },
      {
        type: "view",
        label: "Contact",
        sublabel: "Email, LinkedIn, GitHub",
        viewId: viewConfigMap.contact.id,
        component: () => <ContactView />,
        preview: SplitScreenPreview.Contact,
      },
      {
        type: "view",
        label: "Education",
        viewId: viewConfigMap.education.id,
        component: () => <EducationView />,
        preview: SplitScreenPreview.Education,
      },
      {
        type: "view",
        label: strings.music,
        sublabel: "Personal iPod layer",
        viewId: viewConfigMap.music.id,
        component: () => <MusicView />,
      },
      {
        type: "view",
        label: "Settings",
        viewId: viewConfigMap.settings.id,
        component: () => <SettingsView />,
        preview: SplitScreenPreview.Settings,
      },
    ],
    []
  );

  const [scrollIndex] = useScrollHandler(viewConfigMap.home.id, options);

  const handleIdleState = useCallback(() => {
    const activeView = viewStack[viewStack.length - 1];

    const shouldShowNowPlaying =
      !!nowPlayingItem &&
      activeView.id !== viewConfigMap.nowPlaying.id &&
      activeView.id !== viewConfigMap.keyboard.id;

    // Only show the now playing view if we're playing a song and not already on that view.
    if (shouldShowNowPlaying) {
      showView({
        type: "screen",
        id: viewConfigMap.nowPlaying.id,
        component: NowPlayingView,
      });
    }
  }, [nowPlayingItem, showView, viewStack]);

  useEventListener<IpodEvent>("idle", handleIdleState);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default HomeView;
