import { getBackendUrl } from '@/config/environment';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

/**
 * 共通 fetcher 関数
 */
const request = async <TResponse, TBody = Record<string, unknown>>(
  method: HttpMethod,
  path: string,
  body?: TBody,
  headers?: HeadersInit,
): Promise<TResponse> => {
  const res = await fetch(`${getBackendUrl}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  let json: Partial<ApiResponse<TResponse> & ApiError> = {};
  try {
    json = await res.json();
  } catch {
    // JSON でないレスポンス後で考える
  }

  if (!res.ok) {
    const error: ApiError = {
      message: json?.message || `API Error: ${res.status}`,
      status: res.status,
      errors: json?.errors,
    };
    throw error;
  }

  if (!json.data) {
    throw new Error('データが取得できませんでした');
  }

  return json.data;
};

export const fetcher = {
  get: <T>(path: string, hedaers?: HeadersInit) => request<T>('GET', path, undefined, hedaers),

  post: <T, U = unknown>(path: string, body?: U, hedaers?: HeadersInit) =>
    request<T, U>('POST', path, body, hedaers),

  put: <T, U = unknown>(path: string, body?: U, hedaers?: HeadersInit) =>
    request<T, U>('PUT', path, body, hedaers),

  delete: <T, U = unknown>(path: string, body?: U, hedaers?: HeadersInit) =>
    request<T, U>('DELETE', path, body, hedaers),
};
