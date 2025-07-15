export interface ApiResponse<T = any> {
  data: T | null;
  error?: string;
  status?: number;
}

export type SongDetail = {
  id: string;
  title: string;
  performer: string;
  duration: number;
  coverUrl: string;
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
