import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { CreateUserRequestDto, LoginRequestDto, LoginResponseDto, UserDto } from '@/utils/dto/user.dto';

class UserService {
  async login(email: string, password: string) {
    const body: LoginRequestDto = {
      email,
      password,
    };

    const response = await betterreadsAxios.post<LoginResponseDto>(`/users/login`, body);
    return response.data;
  }

  async register(name: string, email: string, password: string) {
    const body: CreateUserRequestDto = {
      name,
      email,
      password,
    };

    const response = await betterreadsAxios.post<UserDto>(`/users`, body);
    return response.data;
  }
}

export default new UserService();
