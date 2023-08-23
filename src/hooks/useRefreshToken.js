import { axiosPublic } from '@src/api/axios';
import { useAuth } from '@src/hooks/useStoreContext';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPublic.get('/refresh', {
      withCredentials: true,
    });
    setAuth(response.data.accessToken);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
