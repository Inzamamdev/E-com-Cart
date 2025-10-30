import { useState, useCallback } from "react";

type Product = {
  id: number;
  image: string;
  category: string;
  description: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
};
const useFetch = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(
    async (url: string, method = "GET", body: any = null) => {
      if (!url) return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          ...(body ? { body: JSON.stringify(body) } : {}),
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const result = await res.json();
        setData(result);
        return result; // allows caller to handle response directly
      } catch (err) {
        setError((err as Error).message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, fetchData };
};

export default useFetch;
