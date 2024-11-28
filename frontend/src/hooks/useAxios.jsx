import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

export default function useAxios() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const axiosConfig = {
    // es para incluir el token cuando sea necesario
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  async function axiosGet(url) {
    try {
      setLoading(true);
      const response = await axios.get(url, axiosConfig);
      if (response.status == 200) return response.data;
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.errors);
    } finally {
      setLoading(false);
    }
  }

  async function axiosPost(url, body) {
    try {
      setPosting(true);
      const response = await axios.post(url, body, axiosConfig);
      if (response.status == 200) return response.data;
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.errors);
    } finally {
      setPosting(false);
    }
  }

  async function axiosDelete(url) {
    try {
      setPosting(true);
      const response = await axios.delete(url, axiosConfig);
      if (response.status == 200) return response.data;
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.errors);
    } finally {
      setPosting(false);
    }
  }

  async function axiosPut(url, body) {
    try {
      setPosting(true);
      const response = await axios.put(url, body, axiosConfig);
      if (response.status === 200) return response.data;
    } catch (e) {
      console.log(e);
      setErrors(e.response?.data?.errors);
    } finally {
      setPosting(false);
    }
  }

  return {
    axiosGet,
    axiosPut,
    axiosDelete,
    loading,
    errors,
    axiosPost,
    posting,
  };
}
