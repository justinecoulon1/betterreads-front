import UserService from '@/utils/api/user.service';
import { UserDto } from '@/utils/dto/user.dto';
import { registerFormSchema } from '@/utils/validation/auth';

export type RegisterStateForm = {
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
  } | null;
};

export async function register(registerStateForm: RegisterStateForm, data: FormData): Promise<RegisterStateForm> {
  const formattedData = {
    name: data.get('name'),
    email: data.get('email'),
    passwordForm: { password: data.get('password'), confirm: data.get('confirm-password') },
  };

  const result = registerFormSchema.safeParse(formattedData);
  if (result.error) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  const user: UserDto = await UserService.register(name, email, password);

  return { error: null };
}
