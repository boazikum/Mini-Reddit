import { useState, useEffect } from "react";

interface Props {
  url: string;
  body?: object;
}

const usePost = <returnType,>() => {
  const [data, setData] = useState<returnType[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = ({ url, body = {} }: Props) => {
    const abortConst = new AbortController(); // for when component is closed while fetch still runnning
    setIsPending(true);

    fetch(url, {
      signal: abortConst.signal,
      method: "POST",
      headers: { "Content-type": "application/json" },
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
          console.log(err);
          // AbortError happens only when the component is closed/unaloceted before end of fetch
          setError(err.message); // the .message is very importent here as to not to render an object but string
          setIsPending(false);
        }
      });

    return () => abortConst.abort();
  };

  return { data, isPending, error, postData };
};

export default usePost;
