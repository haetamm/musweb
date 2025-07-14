import axios from 'axios';

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
    const response = await axios.post('/api/login', data);
    return response.data;
  }

  static async loginWithGoogle(idToken: string): Promise<LoginResponse> {
    const response = await axios.post('/api/login-with-google', { idToken });
    return response.data;
  }

  static async logout(): Promise<void> {
    const response = await axios.delete('/api/logout');
    return response.data;
  }
}
