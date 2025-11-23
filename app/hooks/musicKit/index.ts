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
  fetchAlbum: async () => null,
  fetchAlbums: async () => null,
  fetchArtists: async () => null,
  fetchArtistAlbums: async () => null,
  fetchPlaylists: async () => null,
  fetchPlaylist: async () => null,
  fetchSearchResults: async () => null,
});

export const useMKEventListener = (_event: string, _handler: any) => {
  // No-op: Apple Music events disabled
};
