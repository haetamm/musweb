import { AlbumFormData } from '@/utils/validation';
import axios from 'axios';

export type CreateAlbumResponse = {
  newAlbum: string;
};

export class ClientAlbumAction {
  static async createAlbum(data: AlbumFormData): Promise<CreateAlbumResponse> {
    const response = await axios.post('/api/album/create', data);
    return response.data;
  }
}
