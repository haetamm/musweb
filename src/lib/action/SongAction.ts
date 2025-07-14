import { handleApiError } from '@/utils/helper';
import { createServerApiAxios } from '@/utils/serverAxios';
import { ApiResponse, likeDetail } from '@/utils/types';

export type SongResponse = {
  id: string;
  title: string;
  performer: string;
  coverUrl: string | null;
};

export type AlbumSectionResponse = {
  id: string;
  title: string;
  year: number;
  coverUrl: string | null;
  uploader: string;
};

export type SongDetailResponse = {
  id: string;
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration: number;
  coverUrl: string | null;
  uploader: string;
  likes: likeDetail[];
  album: AlbumSectionResponse | null;
};

export class SongAction {
  static async getSongByCurrentUser(): Promise<ApiResponse<SongResponse[]>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/songs/me');
      return { data: response.data.data.songs };
    } catch (error) {
      return handleApiError<SongResponse[]>(error, []);
    }
  }

  static async getSongsLikedByCurrentUser(): Promise<
    ApiResponse<SongResponse[]>
  > {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/songs/likes');
      return { data: response.data.data.songs };
    } catch (error) {
      return handleApiError<SongResponse[]>(error, []);
    }
  }

  static async getSongById(
    id: string
  ): Promise<ApiResponse<SongDetailResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get(`/songs/${id}`);
      return {
        data: response.data.data.song,
      };
    } catch (error) {
      return handleApiError<SongDetailResponse>(error, null);
    }
  }
}
