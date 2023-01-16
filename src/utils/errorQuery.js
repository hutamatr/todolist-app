import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export default function errorQuery(error, message) {
  if (error instanceof AxiosError && error.response.data) {
    return toast.error(error?.response.data.message);
  } else if (error instanceof Error && !error.response.data) {
    return toast.error(error?.message);
  } else {
    return toast.error(message);
  }
}
