export interface ApiResponse<T = any> {
  data: T | null;
  error?: string;
  status?: number;
}

export interface SongSection {
  id: string;
  title: string;
  performer: string;
  duration: number;
  coverUrl: string;
  userId: string;
}

export interface AlbumSection {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverUrl: string;
  uploader: string;
}

export interface SongMetadata {
  id: string | null;
  title: string;
  year: string;
  performer: string;
  genre: string;
  duration: string;
  album: AlbumSection | null;
}

export type SongDetail = {
  id: string;
  title: string;
  year: string;
  performer: string;
  genre: string;
  duration: number;
  coverUrl: string;
  userId: string;
  likesCount: string;
};

export type likeDetail = {
  userId: string;
  fullname: string;
};

export type collaborationDetail = {
  userId: string;
  fullname: string;
};

export type PaginationResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousPage: number | null;
  nextPage: number | null;
};

export interface PaginatedResponse<T> {
  data: T; // Will hold { songs: SongResponse[] } or similar
  _pagination: PaginationResponse;
}
