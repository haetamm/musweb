import axios from 'axios';
import { SongFormData } from '@/utils/validation';
import { SongDetail, SongMetadata } from '@/utils/types';

export type CreateSongResponse = {
  song: SongDetail;
};

export class ClientSongAction {
  static async createSong(data: SongFormData): Promise<CreateSongResponse> {
    const payload = {
      title: data.title,
      year: data.year,
      performer: data.performer,
      genre: data.genre,
      duration: data.duration,
      ...(data.albumId &&
        data.albumId.trim() !== '' && { albumId: data.albumId }),
    };

    const response = await axios.post('/api/song/create', payload);
    return response.data;
  }

  static async updateSong(
    id: string,
    data: SongFormData
  ): Promise<CreateSongResponse> {
    const payload = {
      id,
      title: data.title,
      year: data.year,
      performer: data.performer,
      genre: data.genre,
      duration: data.duration,
      ...(data.albumId &&
        data.albumId.trim() !== '' && { albumId: data.albumId }),
    };

    const response = await axios.put('/api/song/update', payload);
    return response.data;
  }

  static async getSongById(id: string): Promise<SongMetadata> {
    const response = await axios.post('/api/song/detail', { id });
    return response.data.song;
  }
}
