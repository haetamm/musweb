import axios from 'axios';
import { SongFormData } from '@/utils/validation';

export type CreateSongResponse = {
  newSong: string;
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
}
