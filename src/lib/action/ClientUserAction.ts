import axios from 'axios';
import { collaborationDetail } from '@/utils/types';

export class ClientUserAction {
  static async getUserByQuery(query: string): Promise<collaborationDetail[]> {
    const response = await axios.post('/api/user/search', { name: query });
    return response.data.users;
  }
}
