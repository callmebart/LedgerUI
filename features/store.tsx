/*REDUX TOOLKIT*/
import { configureStore } from "@reduxjs/toolkit";


/*REDUCERS*/
import cardsReducer from "./cards/cardsSlice";

const store  = configureStore({
    reducer:{
        cards:cardsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export default store