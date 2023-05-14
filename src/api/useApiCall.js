import {useEffect, useState} from "react";

const useApiCall = (service) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        service()
            .then((data) => {
                setData(data.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    return [loading, data, error]
}

export default useApiCall;