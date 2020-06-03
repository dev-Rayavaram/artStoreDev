import {INCREASE_QUANTITY,DECREASE_QUANTITY,CLEAR_PRODUCT} from './types'

export const productQuantity = (action,name)=>{
    return(dispatch)=>{
        dispatch({
            type:action ==="increase" ? INCREASE_QUANTITY:DECREASE_QUANTITY,
            payload:name
        })

    }
}
export const clearProduct = (action,name)=>{
    return(dispatch)=>{
         dispatch({
            type: CLEAR_PRODUCT,
            payload:name
        })

    }
}