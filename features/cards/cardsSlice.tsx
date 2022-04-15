import { createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { creditCardType } from "./types"


const initialCard = [
    {
        id: 0,
        cardType: 'visa',
        cardBalance: '320.00',
        cardNumber: '1337 1234 4000 1234',
        cardCVV: '123',
        cardExpirationDate: '07/30',
        cardHodlerName: 'Bart',
        userId:0,
    }
]

const initialState = {
    cards: [...initialCard],
    status: 'idle',
    error: null
}

//eventually fetching data from server here in the future 
//
//
const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        cardAdded: {
            reducer(state, action: PayloadAction<creditCardType>) {
                console.log(action.payload)
                state.cards.push(action.payload)
              
            },
            prepare: (card: creditCardType) => {
                return {
                    payload: {
                        id: nanoid(),
                        cardType: card.cardType,
                        cardBalance: card.cardBalance,
                        cardNumber: card.cardNumber,
                        cardCVV: card.cardCVV,
                        cardExpirationDate: card.cardExpirationDate,
                        cardHodlerName: card.cardHodlerName,
                        userId:card.userId
                        //add to which user card belongs to : userId 
                    }
                }
            }
        },
    },
})


export const {cardAdded} = cardsSlice.actions

export const selectAllCards = (state:RootState)=>state.cards.cards
export const selectCardById = (state:RootState,cardId:any) => state.cards.cards.find(card => card.id === cardId)
export const selectUserCards = createSelector(
    [selectAllCards,(state:RootState,userId:number)=>userId],
    (cards,userId) => cards.filter(card => card.userId == userId)
)


export default cardsSlice.reducer


