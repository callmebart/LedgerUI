import { createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { userType } from "./types"



const users = [
    {
        id: 0,
        iconName: 'add'
    },
    {
        userId: 1,
        userName: 'Tom',
        accoutAddress: {
            creditCard: '3333 2344 0000 2033',
            metaMask: 'cd2a3d9f938e13cd947ec05abc7fe734df8dd826'
        },
        profileImage: require('../../assets/images/users/tom.png')
    },
    {
        userId: 2,
        userName: 'Debora',
        accoutAddress: {
            creditCard: '3333 2344 0000 2033',
            metaMask: 'cd2a3d9f938e13cd947ec05abc7fe734df8dd826'
        },
        profileImage: require('../../assets/images/users/debora.png')
    },
    {
        userId: 3,
        userName: 'John',
        accoutAddress: {
            creditCard: '3333 2344 0000 2033',
            metaMask: 'cd2a3d9f938e13cd947ec05abc7fe734df8dd826'
        },
        profileImage: require('../../assets/images/users/barack.png')
    }
]

const initialState = {
    users: [...users],
    status: 'idle',
    error: null
}

//eventually fetching data from server here in the future 
//
//
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: {
            reducer(state, action: PayloadAction<userType>) {
                console.log(action.payload)
                state.users.push(action.payload)

            },
            prepare: (user: userType) => {
                return {
                    payload: {
                        userId: nanoid(),
                        userName: user.userName,
                        accoutAddress: {
                            creditCard: user.accoutAddress.creditCard,
                            metaMask: user.accoutAddress.metaMask
                        },
                        profileImage: require('../../assets/images/users/default.png')
                    }
                }
            }
        },
    },
})


export const { addNewUser } = usersSlice.actions

export const selectAllUsers = (state: RootState) => state.users.users
export const selectUserById = (state: RootState, userId: any) => state.users.users.find(user => user.userId === userId)
export const selectUserPeople = createSelector(
    [selectAllUsers, (state: RootState, userId: any) => userId],
    (users, userId) => users.filter(user => user.userId == userId)
)
export default usersSlice.reducer


