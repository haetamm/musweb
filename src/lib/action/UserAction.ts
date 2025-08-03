import { collaborationDetail } from '@/utils/types';
import axios from 'axios';

export type UserResponse = {
  id: string;
  fullname: string;
  email: string;
};

export class UserAction {
  static async getUserCurrent(): Promise<UserResponse> {
    const response = await axios.post('/api/me');
    return response.data.user;
  }

  static async getUserByQuery(query: string): Promise<collaborationDetail[]> {
    const response = await axios.post('/api/user/search', { name: query });
    return response.data.users;
  }
}
