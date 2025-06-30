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
        let response = await res.json();
        if (!res.ok) {
          if (response.message) {
            throw new Error(response.message);
          } else {
            throw new Error(
              `could not fetch the data, Error: ${res.statusText}`
            );
          }
        }

        return response;
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

  return { data, isPending, error, postData };
};

export default usePost;
