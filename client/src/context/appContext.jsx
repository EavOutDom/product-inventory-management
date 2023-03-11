import { createContext, useEffect, useMemo, useReducer } from "react";
import { appReducer } from "./appReducer";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
    const [appState, appDispatch] = useReducer(appReducer, {
        loading: false,
        is_login: null,
    });

    useEffect(() => {
        if (
            localStorage.getItem("user") &&
            localStorage.getItem("user") !== "undefined"
        ) {
            appDispatch({ type: "SET_LOGIN", payload: true });
        } else appDispatch({ type: "SET_LOGIN", payload: false });
    }, []);

    const providerValue = useMemo(
        () => ({ appState, appDispatch }),
        [appState, appDispatch]
    );

    return (
        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
