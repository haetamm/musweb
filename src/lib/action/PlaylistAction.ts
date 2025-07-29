import {
  collaborationDetail,
  PaginationResponse,
  SongSection,
} from './../../utils/types';
import { handleApiError } from '@/utils/helper';
import { createServerApiAxios } from '@/utils/serverAxios';
import { ApiResponse, likeDetail } from '@/utils/types';

export type PlaylistDetailResponse = {
  id: string;
  title: string;
  owner: string;
  songCount: string;
  totalDuration: string;
  songs: SongSection[];
  likes: likeDetail[];
  collaborations: collaborationDetail[];
};

export type PlaylistResponse = {
  id: string;
  title: string;
  owner: string;
  songCount: string;
  totalDuration: string;
};

export type PaginatedPlaylistResponse = {
  playlists: PlaylistResponse[];
  _pagination: PaginationResponse;
};

export class PlaylistAction {
  private static getDefaultPaginatedResponse(): PaginatedPlaylistResponse {
    return {
      playlists: [],
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

  static async getPlaylistByUserCurrent(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedPlaylistResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/playlists/me', {
        params: { page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedPlaylistResponse>(
        error,
        this.getDefaultPaginatedResponse()
      );
    }
  }

  static async getPlaylistLikedByUserCurrent(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedPlaylistResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/playlists/likes', {
        params: { page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedPlaylistResponse>(
        error,
        this.getDefaultPaginatedResponse()
      );
    }
  }

  static async getPlaylistCollaboration(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedPlaylistResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/playlists/collab', {
        params: { page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedPlaylistResponse>(
        error,
        this.getDefaultPaginatedResponse()
      );
    }
  }

  static async getPlaylistById(
    id: string
  ): Promise<ApiResponse<PlaylistDetailResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get(`/playlists/${id}/songs`);
      return { data: response.data.data.playlist };
    } catch (error) {
      return handleApiError<PlaylistDetailResponse>(error);
    }
  }

  static async getPlaylistsByQuery(
    title: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedPlaylistResponse>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/playlists', {
        params: { title, page, limit },
      });
      return { data: response.data.data };
    } catch (error) {
      return handleApiError<PaginatedPlaylistResponse>(
        error,
        this.getDefaultPaginatedResponse()
      );
    }
  }
}
