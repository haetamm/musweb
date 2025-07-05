export interface Song {
  id: number;
  title: string;
  performer: string;
  cover: string;
}

export interface Playlist {
  id: string;
  name: string;
  username: string;
  songs: Song[];
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  songs: number;
  duration: string;
  likes: number;
}
