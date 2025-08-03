import { PlaylistSongRequest, PlaylistWithSongs } from '@/stores/playlists';
import { PlaylistData } from '@/utils/types';
import { PlaylistFormData } from '@/utils/validation';
import axios from 'axios';

export class ClientPlaylistAction {
  static async createPlaylist(
    data: PlaylistFormData,
    songId: string | null
  ): Promise<PlaylistWithSongs> {
    const payload = {
      ...data,
      ...(songId && { songId }),
    };
    const response = await axios.post('/api/playlist/create', payload);
    return response.data.playlist;
  }

  static async updatePlaylist(
    id: string,
    data: PlaylistFormData
  ): Promise<string> {
    const payload = {
      id,
      ...data,
    };
    const response = await axios.put('/api/playlist/update', payload);
    return response.data.message;
  }

  static async getAllMyPlaylist(): Promise<PlaylistWithSongs[]> {
    const response = await axios.post('/api/playlist/all');
    return response.data.playlists;
  }

  static async createPlaylistSong(data: PlaylistSongRequest): Promise<string> {
    const response = await axios.post('/api/playlist/song/create', data);
    return response.data.playlistId;
  }

  static async deletePlaylistSong(data: PlaylistSongRequest): Promise<string> {
    const response = await axios.delete('/api/playlist/song/delete', {
      data,
    });
    return response.data.message;
  }

  static async getPlaylistActivities(id: string): Promise<PlaylistData> {
    const response = await axios.post('/api/playlist/activity', {
      id,
    });
    return response.data.playlist;
  }

  static async deletePlaylistById(id: string): Promise<{ messsage: string }> {
    const response = await axios.delete('/api/playlist/delete', {
      data: { id },
    });
    return response.data.message;
  }
}
