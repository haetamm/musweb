import { urlPage } from '@/utils/constans';
import { redirect } from 'next/navigation';

const page = () => {
  redirect(urlPage.HOME);
};

export default page;
