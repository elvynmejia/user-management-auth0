import { useQuery } from 'react-query';
import axios from 'axios';
import useGetAccessToken from '../hooks/useGetAccessToken';

const audience = process.env.REACT_APP_AUTH0_USER_MANAGEMENT_AUDIENCE as string;

const getUserProfile = async (token: string, userId: string) => {
  if (token === '') {
    return;
  }

  try {
    const url = [
      `${audience}users`,
      userId
    ].join('/');

    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error: any) {
    throw error;
  }
};

type User = {
  sub: string | null;
  picture: string | '';
  name: string | '';
  email: string | null;
};

const UserProfile = (props: any) => {
  const { userId } = props;

  const { data: token } = useGetAccessToken(
    audience,
    'read:current_user'
  );

  const {
    data,
    isLoading,
    isError
  } = useQuery<User, Error>(
    ['fetchUserProfile', userId, token],
    () => getUserProfile(token, userId)
  );

  if (isLoading) {
    return <div>loading ...</div>
  }

  if (isError) {
    return <div>Try realoding the page.</div>
  }

  return (
    <div className="App">
      <p>id: {userId}</p>
      <h2>{data?.name}</h2>
      <img src={data?.picture} alt={data?.name} />
      <p>{data?.email}</p>
    </div>
  )
}

export default UserProfile;
