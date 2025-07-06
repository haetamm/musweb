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
  name: string;
  year: number;
  coverUrl: string | null;
  songs: Song[];
  duration: number;
  likes: number;
}

export interface SongDetail {
  id: string;
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration: number;
}
