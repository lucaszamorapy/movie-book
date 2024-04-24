import { useCallback, useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url) => {
    let response;
    let json;
    setLoading(true);
    try {
      response = await fetch(url);
      json = await response.json();
      setLoading(false);
      return { response, json };
    } catch (error) {
      setLoading(false);
      throw new Error("Erro ao processar a solicitação: " + error.message);
    }
  }, []);

  return {
    request,
    loading,
    setLoading,
  };
};

export default useFetch;
