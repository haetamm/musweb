import { collaborationDetail } from './../../utils/types';
import { handleApiError } from '@/utils/helper';
import { createServerApiAxios } from '@/utils/serverAxios';
import { ApiResponse, likeDetail, SongDetail } from '@/utils/types';

export type PlaylistResponse = {
  id: string;
  title: string;
  owner: string;
  songCount: string;
  totalDuration: string;
};

export type PlaylistDetailResponse = {
  id: string;
  title: string;
  owner: string;
  songCount: string;
  totalDuration: string;
  songs: SongDetail[];
  likes: likeDetail[];
  collaborations: collaborationDetail[];
};

export class PlaylistAction {
  static async getPlaylistByUserCurrent(): Promise<
    ApiResponse<PlaylistResponse[]>
  > {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/playlists/me');
      return { data: response.data.data.playlists };
    } catch (error) {
      return handleApiError<PlaylistResponse[]>(error, []);
    }
  }

  static async getPlaylistLikedByUserCurrent(): Promise<
    ApiResponse<PlaylistResponse[]>
  > {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/playlists/likes');
      return { data: response.data.data.playlists };
    } catch (error) {
      return handleApiError<PlaylistResponse[]>(error, []);
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
}
