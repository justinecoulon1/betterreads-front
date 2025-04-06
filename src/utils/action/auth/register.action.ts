'use server';

import UserService from '@/utils/api/user.service';
import { UserDto } from '@/utils/dto/user.dto';
import { registerFormSchema } from '@/utils/validation/auth';
import { RegisterStateForm } from '@/utils/action/auth/types';

export async function register(registerStateForm: RegisterStateForm, data: FormData): Promise<RegisterStateForm> {
  const formattedData = {
    name: data.get('name'),
    email: data.get('email'),
    passwordForm: { password: data.get('password'), confirm: data.get('confirm-password') },
  };

  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  const result = registerFormSchema.safeParse(formattedData);
  if (result.error) {
    return {
      name: name,
      email: email,
      error: result.error.flatten().fieldErrors,
    };
  }

  const user: UserDto = await UserService.register(name, email, password);

  return {};
}
