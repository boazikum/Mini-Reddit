import { useState, useEffect, useCallback } from "react";

interface IProps {
  url: string;
  body?: object;
}

const usePut = <returnType,>() => {
  const [data, setData] = useState<returnType[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putData = async ({ url, body = {} }: IProps) => {
    const abortConst = new AbortController(); // for when component is closed while fetch still runnning
    setIsPending(true);

    fetch(url, {
      signal: abortConst.signal,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text());
        }

        return await res.json();
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
  };

  return { data, isPending, error, putData };
};

export default usePut;
