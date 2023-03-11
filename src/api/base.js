const baseUrl = "http://dash.viras.ir:8500";
export const wsBaseUrl = "ws://dash.viras.ir:8500/ws";

export const urls = {
    chats: [
        {
            chat_baseUrl: "http://dash.viras.ir:8500/chat/chat/",
        },
        {
            unansweredChat:
                "http://dash.viras.ir:8500/chat/chat/?room__roomName=&room=&department=&operator=&answer=unanswered",
        },
        {
            answeredChat:
                "http://dash.viras.ir:8500/chat/chat/?room__roomName=&room=&department=&operator=&answer=answered",
        },
        {
            chat: "http://dash.viras.ir:8500/chat/chat/?room__roomName=&room=&department=&operator=&answer=chat",
        },
        {
            cancelChat:
                "http://dash.viras.ir:8500/chat/chat/?room__roomName=&room=&department=&operator=&answer=cancel",
        },
    ],
};

export default baseUrl;
