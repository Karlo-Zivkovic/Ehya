import axios from 'axios';
import { CreateCommentType } from '../types';
import { API_BASE_URL, handleError } from '../utils';

export const createComment = async ({
  slug,
  desc,
  token,
  parent = null,
}: CreateCommentType) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const data = await axios.post(
      `${API_BASE_URL}/api/comments`,
      {
        slug,
        desc,
        token,
        parent,
      },
      { headers },
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllComments = async ({
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

    const data = await axios(`${API_BASE_URL}/api/comments/${slug}`, {
      headers,
    });

    return data.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteComment = async ({
  _id,
  token,
}: {
  _id: string;
  token: string;
}) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    await axios.delete(`${API_BASE_URL}/api/comments/${_id}`, { headers });
  } catch (error) {
    handleError(error);
  }
};

export const editComment = async ({
  token,
  desc,
  _id,
}: {
  token: string;
  desc: string;
  _id: string;
}) => {
  try {
    const body = {
      desc,
    };
    const headers = {
      authorization: `Bearer ${token}`,
    };

    await axios.put(`${API_BASE_URL}/api/comments/${_id}`, body, { headers });
  } catch (error) {
handleError(error);  }
};
