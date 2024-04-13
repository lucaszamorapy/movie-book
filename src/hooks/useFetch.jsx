import { useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const request = useCallback(async (url) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
      if (response.ok) {
        console.log("Fecth realizado com sucesso");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      setResponseMessage("Erro ao fazer a solicitação");
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
    isSubmitDisabled,
    responseMessage,
  };
};

export default useFetch;
