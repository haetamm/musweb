import axios from 'axios';
import { SongFormData } from '@/utils/validation';
import { SongDetail, SongMetadata } from '@/utils/types';

export type CreateSongResponse = {
  song: SongDetail;
};

export class ClientSongAction {
  private static buildPayload(data: SongFormData, id?: string) {
    const payload: any = {
      title: data.title,
      year: data.year,
      performer: data.performer,
      genre: data.genre,
      duration: data.duration,
    };

    if (id) payload.id = id;
    if (data.albumId?.trim()) payload.albumId = data.albumId;

    return payload;
  }

  static async createSong(data: SongFormData): Promise<CreateSongResponse> {
    const payload = this.buildPayload(data);
    const response = await axios.post('/api/song/create', payload);
    return response.data;
  }

  static async updateSong(
    id: string,
    data: SongFormData
  ): Promise<CreateSongResponse> {
    const payload = this.buildPayload(data, id);
    const response = await axios.put('/api/song/update', payload);
    return response.data;
  }

  static async getSongById(id: string): Promise<SongMetadata> {
    const response = await axios.post('/api/song/detail', { id });
    return response.data.song;
  }

  static async deleteSongById(id: string): Promise<{ messsage: string }> {
    const response = await axios.delete('/api/song/delete', { data: { id } });
    return response.data.message;
  }
}
