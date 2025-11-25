// Stub implementation - Apple Music integration removed
export const useMusicKit = () => ({
  music: {
    setQueue: async () => {},
    play: async () => {},
    pause: () => {},
    skipToNextItem: async () => {},
    skipToPreviousItem: async () => {},
  } as any,
  isConfigured: false,
  isAuthorized: false,
  signIn: async () => {
    console.warn('Apple Music integration has been removed');
  },
  signOut: async () => {},
});

export const useMKDataFetcher = () => ({
  fetchAlbum: async (..._args: any[]) => null,
  fetchAlbums: async (..._args: any[]) => null,
  fetchArtists: async (..._args: any[]) => null,
  fetchArtistAlbums: async (..._args: any[]) => null,
  fetchPlaylists: async (..._args: any[]) => null,
  fetchPlaylist: async (..._args: any[]) => null,
  fetchSearchResults: async (..._args: any[]) => null,
});

export const useMKEventListener = (_event: string, _handler: any) => {
  // No-op: Apple Music events disabled
};
