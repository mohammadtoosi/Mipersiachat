import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../redux/snackbar";

const useChat = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const fetchApiAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const transformedData = data.results.map((chat) => {
                return {
                    id: chat.id,
                    data: data,
                    message: chat?.message,
                    room: chat?.room,
                    department: chat?.department,
                    website: chat?.website,
                    customer: chat?.customer,
                    time: chat?.created,
                    answerStatus: chat?.answer,
                    unreadMessages: chat?.message?.filter(
                        (unread) => unread?.isReady === false
                    ),
                    unreadMessagesCounter: chat?.message?.filter(
                        (unread) => unread.isReady === false
                    ).length,
                    created: chat?.created,
                };
            });
            setData(transformedData);
            setIsLoading(false);
        } catch (error) {
            setError("مشکلی پیش اومده لطفا صفحه رو رفرش کنید!");
            dispatch(snackbarActions.openSnackbarAlert());
        }
    };
    useEffect(() => {
        fetchApiAsync();
    }, []);

    return {
        data: data,
        loading: isLoading,
        error: error,
    };
};

export default useChat;
