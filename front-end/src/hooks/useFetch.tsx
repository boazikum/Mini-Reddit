import { useState, useEffect, useCallback } from "react";

interface Props<returnType> {
  url: string;
}

const useFetch = <returnType,>({ url }: Props<returnType>) => {
  const [data, setData] = useState<returnType[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    const abortConst = new AbortController(); // for when component is closed while fetch still runnning
    setIsPending(true);

    try {
      const res = await fetch(url, {
        signal: abortConst.signal,
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`could not fetch the data, Error: ${res.statusText}`);
      }

      const data = await res.json();

      setError(null);
      setData(data);
      setIsPending(false);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        // AbortError happens only when the component is closed/unaloceted before end of fetch
        setError(err.message); // the .message is very importent here as to not to render an object but string
      }
    } finally {
      setIsPending(false);
    }

    return () => abortConst.abort();
  };

  return { data, isPending, error, getData };
};

export default useFetch;
