/*REDUX TOOLKIT*/
import { configureStore } from "@reduxjs/toolkit";


/*REDUCERS*/
import cardsReducer from "./cards/cardsSlice";
import usersReducer from "./users/usersSlice";

const store  = configureStore({
    reducer:{
        cards:cardsReducer,
        users:usersReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export default store