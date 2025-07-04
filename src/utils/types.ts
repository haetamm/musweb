export interface Song {
  id: string;
  title: string;
  performer: string;
}

export interface Playlist {
  id: string;
  name: string;
  username: string;
  songs: Song[];
}
