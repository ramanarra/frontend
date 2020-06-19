import { useState, useEffect } from "react";
import API from "../api";

function useCustomFecth(apiMethod, url, params) {
    const [data, setData] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        const authStr = "Bearer ".concat(token);

        if (apiMethod === "GET") {
            API.get(url, {
                    headers: {
                        Authorization: authStr,
                    },
                })
                .then((res) => {
                    setloading(false);
                    setData(res.data);
                })
                .catch((error) => {
                    setloading(false);
                    setError(error);
                });
        } else if (apiMethod === "POST") {
            API.post(url, params, {
                    headers: {
                        Authorization: authStr,
                    },
                })
                .then((res) => {
                    setloading(false);
                    setData(res.data);
                })
                .catch((error) => {
                    setloading(false);
                    setError(error);
                });
        }
    }, [apiMethod, url, params]);

    return [data, loading, error];
}

export default useCustomFecth;