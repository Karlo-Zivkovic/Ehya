import axios from 'axios';
import { API_BASE_URL, RESULTS_PER_PAGE, handleError } from '../utils';

export const getAllArticles = async (
  token: string,
  page: string | null,
  searchQuery: string,
) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };

    const searchString = searchQuery === '' ? '' : `&search=${searchQuery}`;

    const data = await axios(
      `${API_BASE_URL}/api/articles?page=${page}&limit=${RESULTS_PER_PAGE}` +
        searchString,
      {
        headers,
      },
    );
    const articles = data?.data?.data;
    return { articles, totalCount: data.data.totalCount };
  } catch (error) {
    handleError(error);
  }
};

export const getArticle = async ({
  token,
  slug,
}: {
  token: string;
  slug: string | undefined;
}) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const data = await axios(`${API_BASE_URL}/api/articles/${slug}`, {
      headers,
    });

    return data.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const createArticle = async ({
  title,
  caption,
  photo,
  token,
  slug,
  _id,
}: {
  title: string;
  caption: string;
  photo: File;
  token: string;
  slug: string;
  _id: string;
}) => {
  try {
    const formData = new FormData();
    const headers = {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    };
    const fields = { user: _id, title, caption, photo, slug };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const data = await axios.post(`${API_BASE_URL}/api/articles`, formData, {
      headers,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getMyArticles = async (token: string) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };

    const data = await axios.get(`${API_BASE_URL}/api/articles/myArticles`, {
      headers,
    });

    return data.data.data;
  } catch (error) {
    handleError(error);
  }
};

