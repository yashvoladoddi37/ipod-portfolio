import { SplitScreenPreview } from "components/previews";

export { default as AboutView } from "./AboutView";
export { default as AlbumView } from "./AlbumView";
export { default as AlbumsView } from "./AlbumsView";
export { default as ArtistsView } from "./ArtistsView";
export { default as ArtistView } from "./ArtistView";
export { default as BrickGameView } from "./BrickGameView";
export { default as CoverFlowView } from "./CoverFlowView";
export { default as GamesView } from "./GamesView";
export { default as HomeView } from "./HomeView";
export { default as MusicView } from "./MusicView";
export { default as NowPlayingView } from "./NowPlayingView";
export { default as PlaylistView } from "./PlaylistView";
export { default as PlaylistsView } from "./PlaylistsView";
export { default as SearchView } from "./SearchView";
export { default as SettingsView } from "./SettingsView";
export { default as SongsView } from "./SongsView";

// Portfolio Views
export { default as ProfileView } from "./ProfileView";
export { default as ExperienceView } from "./ExperienceView";
export { default as ExperienceDetailView } from "./ExperienceDetailView";
export { default as ProjectsView } from "./ProjectsView";
export { default as ProjectDetailView } from "./ProjectDetailView";
export { default as SkillsView } from "./SkillsView";
export { default as EducationView } from "./EducationView";
export { default as ContactView } from "./ContactView";

export type ViewType =
  | "screen"
  | "actionSheet"
  | "popup"
  | "keyboard"
  | "coverFlow";

export type ViewConfig = {
  id: string;
  title: string;
  type: ViewType;
  isSplitScreen?: boolean;
  preview?: SplitScreenPreview;
};

export const viewConfigMap: Record<string, ViewConfig> = {
  // Split Screen Views
  home: { id: "home", title: "yashvoladoddi.in", type: "screen", isSplitScreen: true },
  
  profile: {
    id: "profile",
    title: "About Me",
    type: "screen",
    isSplitScreen: false,
    preview: SplitScreenPreview.Profile,
  },
  experience: {
    id: "experience",
    title: "Experience",
    type: "screen",
    isSplitScreen: false,
    preview: SplitScreenPreview.Experience,
  },
  projects: {
    id: "projects",
    title: "Projects",
    type: "screen",
    isSplitScreen: false,
    preview: SplitScreenPreview.Projects,
  },
  skills: {
    id: "skills",
    title: "Skills",
    type: "screen",
    isSplitScreen: false,
    preview: SplitScreenPreview.Skills,
  },
  education: {
    id: "education",
    title: "Education",
    type: "screen",
    isSplitScreen: false,
    preview: SplitScreenPreview.Education,
  },
  contact: {
    id: "contact",
    title: "Contact",
    type: "screen",
    isSplitScreen: false,
    preview: SplitScreenPreview.Contact,
  },

  music: {
    id: "music",
    title: "Music",
    type: "screen",
    isSplitScreen: false,
  },
  games: {
    id: "games",
    title: "Games",
    type: "screen",
    isSplitScreen: true,
    preview: SplitScreenPreview.Games,
  },
  settings: {
    id: "settings",
    title: "Settings",
    type: "screen",
    isSplitScreen: true,
    preview: SplitScreenPreview.Settings,
  },

  // Fullscreen Views
  experienceDetail: {
    id: "experienceDetail",
    title: "Job Details",
    type: "screen",
  },
  projectDetail: {
    id: "projectDetail",
    title: "Project Details",
    type: "screen",
  },
  about: {
    id: "about",
    title: "About",
    type: "screen",
    preview: SplitScreenPreview.Settings,
  },
  artists: {
    id: "artists",
    title: "Artists",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  artist: {
    id: "artist",
    title: "Artist",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  albums: {
    id: "albums",
    title: "Albums",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  album: {
    id: "album",
    title: "Album",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  songs: {
    id: "songs",
    title: "Songs",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  nowPlaying: {
    id: "nowPlaying",
    title: "Now Playing",
    type: "screen",
    preview: SplitScreenPreview.NowPlaying,
  },
  playlists: {
    id: "playlists",
    title: "Playlists",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  playlist: {
    id: "playlist",
    title: "Playlist",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  search: {
    id: "search",
    title: "Search",
    type: "screen",
    preview: SplitScreenPreview.Music,
  },
  brickGame: {
    id: "brickGame",
    title: "Brick",
    type: "screen",
    preview: SplitScreenPreview.Games,
  },

  // CoverFlow view
  coverFlow: {
    id: "coverFlow",
    title: "Message Cards",
    type: "coverFlow",
    preview: SplitScreenPreview.Music,
  },

  // Action sheets
  mediaActionSheet: {
    id: "mediaActionSheet",
    title: "Media Options",
    type: "actionSheet",
  },
  serviceTypeActionSheet: {
    id: "serviceTypeActionSheet",
    title: "Service",
    type: "actionSheet",
  },
  deviceThemeActionSheet: {
    id: "deviceThemeActionSheet",
    title: "Device theme",
    type: "actionSheet",
  },
  signinPopup: {
    id: "signinPopup",
    title: "Sign in",
    type: "actionSheet",
  },
  signOutPopup: {
    id: "signOutPopup",
    title: "Sign out",
    type: "actionSheet",
  },

  // Popups
  spotifyNotSupportedPopup: {
    id: "spotifyNotSupportedPopup",
    title: "Unsupported browser",
    type: "popup",
  },
  spotifyNonPremiumPopup: {
    id: "spotifyNonPremiumPopup",
    title: "Premium",
    type: "popup",
  },
  musicProviderErrorPopup: {
    id: "musicProviderErrorPopup",
    title: "Error",
    type: "popup",
  },

  // Keyboard
  keyboard: {
    id: "keyboard",
    title: "Keyboard",
    type: "keyboard",
  },
};

export default viewConfigMap;

