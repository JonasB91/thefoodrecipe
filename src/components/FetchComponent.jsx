import { useState, useEffect } from "react";

const FetchComponent = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
                console.log(data) // Vill logga data från api
            } catch (error) {
                setError(error)
            }
            setLoading(false);
        };

        fetchData();
    }, [url]);

    return { data, loading, error}
};

export default FetchComponent;