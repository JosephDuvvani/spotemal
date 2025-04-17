import { useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setData(data);
        else if (data.error) setError(data.error);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
