export interface ApiResponse<T = any> {
  data: T | null;
  error?: string;
  status?: number;
}

export type SongDetail = {
  id: string;
  title: string;
  performer: string;
  duration: number; // dalam detik
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
