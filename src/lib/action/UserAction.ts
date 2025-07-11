import axiosInstance from '@/utils/api';

export type UserResponse = {
  fullname: string;
  email: string;
};

export class UserAction {
  static async getUserCurrent(): Promise<UserResponse> {
    const response = await axiosInstance.get('/users');
    return response.data.data.user;
  }
}
