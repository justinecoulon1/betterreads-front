import { noRetryBetterreadsAxios } from '@/utils/api/betterreads-axios';
import {
  CreateUserRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  RefreshRequestDto,
  UserDto,
} from '@/utils/dto/user.dto';

class UserService {
  async login(email: string, password: string) {
    const body: LoginRequestDto = {
      email,
      password,
    };

    const response = await noRetryBetterreadsAxios.post<LoginResponseDto>(`/users/login`, body);
    return response.data;
  }

  async register(name: string, email: string, password: string) {
    const body: CreateUserRequestDto = {
      name,
      email,
      password,
    };

    const response = await noRetryBetterreadsAxios.post<UserDto>(`/users`, body);
    return response.data;
  }

  async refresh(refreshToken: string) {
    const body: RefreshRequestDto = {
      refreshToken,
    };

    const response = await noRetryBetterreadsAxios.post<LoginResponseDto>(`/users/refresh`, body);
    return response.data;
  }
}

export default new UserService();
