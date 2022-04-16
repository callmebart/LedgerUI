/*REDUX TOOLKIT*/
import { configureStore,combineReducers } from "@reduxjs/toolkit";


/*REDUCERS*/
import cardsReducer from "./cards/cardsSlice";
import usersReducer from "./users/usersSlice";

const rootReducer = combineReducers({
    users:usersReducer,
    cards:cardsReducer,
    
})
const store  = configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export default store