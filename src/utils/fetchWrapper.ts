import { FetchServerResponseResult } from 'next/dist/client/components/router-reducer/fetch-server-response';
import { NextResponse } from 'next/server';
import { getCookie, setCookie } from './common';
import { TFetchError, TFetchResponse } from '@/types/common';

const FETCH_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEST_URL = 'https://jsonplaceholder.typicode.com';

const defaultOptions = {
  method: FETCH_METHODS.GET,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const rewrite = (url: string): string => {
  if (url.startsWith('/api')) {
    // return `${BASE_URL}${url.replace('/api', '/api')}`;
    return url;
  }

  if (url.startsWith('/todos')) {
    return `${TEST_URL}${url}`;
  }

  return `${url}`;
};

/**
 *
 * @param url
 * @param options
 *
 * @example await fetchWrapper(url, options);
 *
 */

export const fetchWrapper = async <T>(
  url: string,
  options?: RequestInit,
): Promise<TFetchResponse<T> | TFetchError> => {
  const accessToken = getCookie('accessToken');

  try {
    let response;

    response = await fetch(rewrite(url), {
      ...defaultOptions,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 202) {
      const accessToken_new = response.token;
      setCookie('accessToken', accessToken_new);

      response.response = await fetch(isServer ? rewrite(url) : `${url}`, {
        ...defaultOptions,
        headers: {
          Authorization: `Bearer ${accessToken_new}`,
          ...(options?.headers || {}),
        },
        ...options,
      });
    }
    // wrapping response.json() in await to catch json parsing errors
    // return await response.json();
    return await response.json();
  } catch (error) {
    console.error('Fetch Wrapper Error:', error);
    // throw error;
    if (url.startsWith('/api')) {
      if (error.status === 406) {
        return location.replace('/');
      }
    }
  }
};

export default fetchWrapper;
