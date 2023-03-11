import { useState, useEffect } from "react";

const useGetFiles = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchApiAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://dash.viras.ir:8500/api/file/",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            const data = await response.json();
            const transformedData = data.results.map((file) => {
                return {
                    id: file?.id,
                    url: file?.file,
                };
            });
            setFiles(transformedData);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };
    useEffect(() => {
        fetchApiAsync();
    }, []);

    return {
        files: files,
        loading: isLoading,
        error: error,
    };
};

export default useGetFiles;
