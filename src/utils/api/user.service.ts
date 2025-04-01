import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { LoginRequestDto, LoginResponseDto } from '@/utils/dto/user.dto';

class UserService {
  async login(email: string, password: string) {
    const body: LoginRequestDto = {
      email,
      password,
    };

    const response = await betterreadsAxios.post<LoginResponseDto>(`/users/login`, body);
    return response.data;
  }
}

export default new UserService();
