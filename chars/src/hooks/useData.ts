import { useEffect, useState } from "react";

const useData = <T>(url: string, method?:string, body?:any) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);

    let init = {}

    if (method && body) {
      init = {method: method, body: body}
    }

    useEffect(() => {
        fetch(url, init)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setError(err)
            setLoading(false);
          })
      }, [url]);
    
      return { data, error, isLoading };
}

export default useData;