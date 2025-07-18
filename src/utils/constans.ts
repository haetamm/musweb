export const urlPage = {
  HOME: '/discover',
  PLAYLIST: '/playlist',
  PLAYLIST_LIKES: '/playlist/likes',
  PLAYLIST_DETAIL: '/playlist-detail',
  LIBRARY: '/you',
  SONG: '/song',
  ALBUM: '/album',
  LIBRARY_SONG: '/you/song',
  LIBRARY_SONG_LIKES: '/you/likes',
  LIBRARY_ALBUM: '/you/album',
  SEARCH: '/search',
  SEARCH_ALBUM: '/search/albums',
  SEARCH_PLAYLIST: '/search/playlists',
};

export const MODAL_TYPES = {
  LOGOUT: 'logout',
  DELETE: 'delete',
  USER_GOOGLE_FORM: 'userGoogleForm',
  LOGIN_FORM: 'loginForm',
  GOOGLE_LOGIN_FORM: 'googleLoginForm',
} as const;
