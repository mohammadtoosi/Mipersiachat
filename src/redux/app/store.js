import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import dialogReducer from "../dialog";
import dashboardReducer from "../dashboard";
import drawerReducer from "../drawer";
import subMenuDrawerReducer from "../submenu";
import darkModeReducer from "../dark-mode";
import profileEditReducer from "../profile-edit";
import ChatDrawerReducer from "../chat-drawer";
import departmentReducer from "../department";
import AuthReducer from "../auth";
import chatListReducer from "../chat-list";
import fileReducer from "../file";
import notificationReducer from "../notification";
import snackbarReducer from "../snackbar";

const persistedReducer = persistReducer(
    {
        key: "auth-root",
        storage: storage,
    },
    AuthReducer.reducer
);

// store
const store = configureStore({
    reducer: {
        dialog: dialogReducer.reducer,
        dashboard: dashboardReducer.reducer,
        drawer: drawerReducer.reducer,
        submenu: subMenuDrawerReducer.reducer,
        darkMode: darkModeReducer.reducer,
        profileEdit: profileEditReducer.reducer,
        chat: ChatDrawerReducer.reducer,
        dep: departmentReducer.reducer,
        auth: persistedReducer,
        chatList: chatListReducer.reducer,
        file: fileReducer.reducer,
        notification: notificationReducer.reducer,
        snackbar: snackbarReducer.reducer,
        //[chatApi.reducerPath]: chatApi.reducer,
    },
    // middleware: (getDefaultMiddleware) => ({
    //     serializableCheck: {
    //        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // }),
});

export const persistor = persistStore(store);

//setupListeners(store.dispatch);

export default store;
