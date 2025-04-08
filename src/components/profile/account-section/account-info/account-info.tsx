import { UserDto } from '@/utils/dto/user.dto';

export default function AccountInfo({ user }: { user: UserDto }) {
  return <div>Account name: {user.name}</div>;
}
