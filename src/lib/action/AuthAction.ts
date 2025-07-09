import axiosInstance from '@/utils/api';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LogoutRequest = {
  refreshToken: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export class AuthAction {
  static async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post('/authentications', data);
    return response.data.data;
  }

  static async loginWithGoogle(idToken: string): Promise<LoginResponse> {
    const response = await axiosInstance.post('/authentications/google', {
      idToken,
    });
    return response.data.data;
  }

  static async logout(data: LogoutRequest): Promise<void> {
    await axiosInstance.delete('/authentications', { data: data });
  }
}
