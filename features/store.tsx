/*REDUX TOOLKIT*/
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

/*REDUCERS*/
import cardsReducer from "./cards/cardsSlice";
import usersReducer from "./users/usersSlice";

const rootReducer = combineReducers({
    cards: cardsReducer,
    users: usersReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export default store