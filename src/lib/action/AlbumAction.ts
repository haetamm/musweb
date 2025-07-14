import { handleApiError } from '@/utils/helper';
import { createServerApiAxios } from '@/utils/serverAxios';
import { ApiResponse, SongDetail } from '@/utils/types';

export type AlbumDetailResponse = {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  songCount: string;
  totalDuration: string;
  songs: SongDetail[];
};

export type AlbumResponse = {
  id: string;
  title: string;
  year: number;
  coverUrl: string;
  songCount: string;
  totalDuration: string;
};

export class AlbumAction {
  static async getAlbumByUserCurrent(): Promise<ApiResponse<AlbumResponse[]>> {
    try {
      const axios = await createServerApiAxios();
      const response = await axios.get('/albums/me');
      return { data: response.data.data.albums };
    } catch (error) {
      return handleApiError<AlbumResponse[]>(error, []);
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
}
