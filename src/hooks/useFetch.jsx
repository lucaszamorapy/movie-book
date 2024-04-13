import { useCallback } from "react";

const useFetch = () => {
  const request = useCallback(async (url) => {
    let response;
    let json;

    response = await fetch(url);
    json = await response.json();
    return { response, json };
  }, []);

  return {
    request,
  };
};

export default useFetch;
