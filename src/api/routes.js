const base = "http://dash.viras.ir:8500";
const baseSocket = "ws://dash.viras.ir:8500/ws";
const routes = {
    chatSocket: `${baseSocket}/chat`,
    login: `${base}/api/account/login/`,
    website: `${base}/api/website/`,
    operator: `${base}/api/operator/`,
    question: `${base}/api/question/`,
    department: `${base}/api/department/`,
    customer: `${base}/api/customer/`,
    file: `${base}/api/file/`,
    dashboard: `${base}/api/dashboard/`,
    chat: `${base}/chat/chat/`,
    message: `${base}/chat/message/`,
    tag: `${base}/chat/tag/`,
    chartChat: `${base}/chat/chartChat/`,
    chartOperator: `${base}/chat/chartOperator/`,
    chartDate: `${base}/chat/chartDate/`,
};

export default routes;
