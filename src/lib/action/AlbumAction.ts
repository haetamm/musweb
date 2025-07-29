import { handleApiError } from '@/utils/helper';
import { createServerApiAxios } from '@/utils/serverAxios';
import { ApiResponse, PaginationResponse, SongSection } from '@/utils/types';

export type AlbumDetailResponse = {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverUrl: string;
  userId: string;
  songCount: string;
  totalDuration: string;
  songs: SongSection[];
};

export type AlbumResponse = {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverUrl: string;
  userId: string;
  songCount: string;
  totalDuration: string;
};

export type PaginatedAlbumResponse = {
  albums: AlbumResponse[];
  _pagination: PaginationResponse;
};

export class AlbumAction {
  private static getDefaultPaginatedResponse(): PaginatedAlbumResponse {
    return {
      albums: [],
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
    };
  }
  static async getAlbumByUserCurrent(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedAlbumResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/albums/me', {
        params: { page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedAlbumResponse>(
        error,
        this.getDefaultPaginatedResponse()
      );
    }
  }

  static async getAlbumById(
    id: string
  ): Promise<ApiResponse<AlbumDetailResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get(`/albums/${id}`);
      return { data: response.data.data.album };
    } catch (error) {
      return handleApiError<AlbumDetailResponse>(error);
    }
  }

  static async getAlbumByQuery(
    title: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedAlbumResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/albums', {
        params: { title, page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedAlbumResponse>(
        error,
        this.getDefaultPaginatedResponse()
      );
    }
  }
}
