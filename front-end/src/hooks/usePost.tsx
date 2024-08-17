import { useState, useEffect } from "react";

interface Props<returnType> {
  url: string;
  body?: {};
}

const usePost = <returnType,>({ url, body = {} }: Props<returnType>) => {
  const [data, setData] = useState<returnType[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortConst = new AbortController(); // for when component is closed while fetch still runnning

    fetch(url, {
      signal: abortConst.signal,
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`could not fetch the data, Error: ${res.statusText}`);
        }

        return res.json();
      })
      .then((data) => {
        setError(null);
        setData(data);
        setIsPending(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          // AbortError happens only when the component is closed/unaloceted before end of fetch
          setError(err.message); // the .message is very importent here as to not to render an object but string
          setIsPending(false);
        }
      });

    return () => abortConst.abort();
  }, [url]);

  return { data, isPending, error };
};

export default usePost;
