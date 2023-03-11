import { useState } from "react";

const useAuthentication = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    if (isUserAuthenticated) {
        setIsUserAuthenticated(true);
    } else {
        setIsUserAuthenticated(false);
    }

    return {
        get: isUserAuthenticated,
        set: setIsUserAuthenticated,
    };
};

export default useAuthentication;
