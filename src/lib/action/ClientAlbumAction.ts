import { AlbumFormData } from '@/utils/validation';
import axios from 'axios';
import { AlbumResponse } from './AlbumAction';
import { AlbumSection } from '@/utils/types';

export type CreateAlbumResponse = {
  album: AlbumResponse;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverUrl: string;
  userId: string;
};

export class ClientAlbumAction {
  static async createAlbum(data: AlbumFormData): Promise<CreateAlbumResponse> {
    const response = await axios.post('/api/album/create', data);
    return response.data;
  }

  static async updateAlbum(id: string, data: AlbumFormData): Promise<Album> {
    const payload = {
      id,
      ...data,
    };
    const response = await axios.put('/api/album/update', payload);
    return response.data.album;
  }

  static async getAlbumByQuery(query: string): Promise<AlbumSection[]> {
    const response = await axios.post('/api/album/search', { title: query });
    return response.data.albums;
  }

  static async deleteAlbumById(id: string): Promise<{ messsage: string }> {
    const response = await axios.delete('/api/album/delete', { data: { id } });
    return response.data.message;
  }

  static async deleteSongFromAlbum(
    id: string,
    songId: string
  ): Promise<{ messsage: string }> {
    const response = await axios.delete('/api/album/delete/song', {
      data: { id, songId },
    });
    return response.data.message;
  }
}
