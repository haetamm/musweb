import { handleApiError } from '@/utils/helper';
import { createServerApiAxios } from '@/utils/serverAxios';
import {
  ApiResponse,
  likeDetail,
  PaginationResponse,
  SongDetail,
} from '@/utils/types';

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
  userId: string;
  likes: likeDetail[];
  album: AlbumSectionResponse | null;
};

export type PaginatedSongResponse = {
  songs: SongDetail[];
  _pagination: PaginationResponse;
};

export class SongAction {
  static async getSongByCurrentUser(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedSongResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/songs/me', {
        params: { page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedSongResponse>(error, {
        songs: [],
        _pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
          previousPage: null,
          nextPage: null,
        },
      });
    }
  }

  static async getSongsLikedByCurrentUser(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedSongResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/songs/likes', {
        params: { page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedSongResponse>(error, {
        songs: [],
        _pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
          previousPage: null,
          nextPage: null,
        },
      });
    }
  }

  static async getSongById(
    id: string
  ): Promise<ApiResponse<SongDetailResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get(`/songs/${id}/detail`);
      return {
        data: response.data.data.song,
      };
    } catch (error) {
      return handleApiError<SongDetailResponse>(error, null);
    }
  }

  static async getSongByQuery(
    title: string,
    page: number = 1,
    random: boolean = false,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedSongResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/songs', {
        params: { title, page, limit, random },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedSongResponse>(error, {
        songs: [],
        _pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
          previousPage: null,
          nextPage: null,
        },
      });
    }
  }
}
