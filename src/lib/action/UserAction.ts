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
}
