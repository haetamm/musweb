import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';
import Cookies from 'js-cookie';
import Link from 'next/link';

interface ErrorResponse {
  status?: string;
  message?: string;
}

export const useHandleErrors = () => {
  const handleErrors = (error: unknown): void => {
    const axiosError = error as AxiosError<ErrorResponse>;

    const showErrorToast = (message: string) => {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-[slide-down_0.3s]' : ''
          } max-w-md w-full bg-red-50 shadow-lg rounded-lg pointer-events-auto flex items-center border-l-4 border-red-500`}
          role="alert"
        >
          <div className="flex-shrink-0 p-3 pl-4 text-red-500">
            <FiAlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 py-2 pr-3">
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="mt-1 text-sm text-red-700">{message}</p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="p-2 mr-2 text-red-500 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ));
    };

    if (!axiosError?.response) {
      showErrorToast('Terjadi kesalahan jaringan. Silakan coba lagi nanti.');
      return;
    }

    const { status, data } = axiosError.response;
    const fallbackMessage = 'Terjadi kesalahan. Silakan coba lagi.';

    switch (status) {
      case 401:
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        showErrorToast(data.message || 'Sesi berakhir, silakan login kembali.');
        break;
      case 403:
        showErrorToast(
          data.message || 'Anda tidak memiliki izin untuk aksi ini.'
        );
        break;
      case 404:
        showErrorToast(data.message || 'Data tidak ditemukan.');
        break;
      case 422:
        showErrorToast(data.message || 'Data yang dikirim tidak valid.');
        break;
      default:
        if (status >= 500) {
          showErrorToast('Kesalahan server. Silakan coba lagi nanti.');
        } else {
          showErrorToast(data.message || fallbackMessage);
        }
        break;
    }
  };

  return { handleErrors };
};

export const showSuccessToast = (
  message: string,
  linkHref: string,
  linkLabel = 'View'
) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-[slide-down_0.3s]' : ''
        } max-w-md w-full bg-green-50 shadow-lg rounded-lg pointer-events-auto flex items-start border-l-4 border-green-500`}
        role="alert"
      >
        <div className="flex-shrink-0 p-3 pl-4 text-green-600">
          <FiCheckCircle className="w-5 h-5" />
        </div>
        <div className="flex-1 py-2 pr-3 text-sm text-green-800">
          <p className="font-medium">Success</p>
          <p className="mt-1">
            {message},{' '}
            {linkHref && (
              <Link
                onClick={() => toast.dismiss(t.id)}
                href={linkHref}
                className="underline font-semibold text-green-700 hover:text-green-900"
              >
                {linkLabel}
              </Link>
            )}
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="p-2 mr-2 text-green-600 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    ),
    { duration: 10000 }
  );
};
