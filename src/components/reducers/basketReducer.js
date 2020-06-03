import { ADD_PRODUCT_BASKET ,GET_NUMBERS_BASKET,INCREASE_QUANTITY,DECREASE_QUANTITY,CLEAR_PRODUCT} from "../actions/types";

const initialState = {
    noOfProducts:0,
    cartCost:0,
    isLoaded:false,
    products:{
        kalankari1:{
            product:"kalankari1",
            quantity:0,
            price:20,
            urlSm:"image-lg-1.jpg",
            urlLg:"image-sm-1.jpg",
            inCart:false
        },
        kalankari2:{
            product:"kalankari2",
            quantity:0,
            price:20,
            urlSm:"image-lg-2.jpg",
            urlLg:"image-sm-2.jpg",
            inCart:false

        },
        Tanjore1:{
            product:"Tanjore1",
            quantity:0,
            price:20,
            urlSm:"image-lg-3.jpg",
            urlLg:"image-sm-3.jpg",
            inCart:false

        },
        Kalankari3:{
            product:"Kalankari3",
            quantity:0,
            price:20,
            urlSm:"image-lg-4.jpg",
            urlLg:"image-sm-4.jpg",
            inCart:false

        },
        Kondapalli1:{
            product:"Kondapalli1",
            quantity:0,
            price:20,
            urlSm:"image-lg-5.jpg",
            urlLg:"image-sm-5.jpg",
            inCart:false

        },
        Kondapalli2:{
            product:"Kondapalli2",
            quantity:0,
            price:20,
            urlSm:"image-lg-6.jpg",
            urlLg:"image-sm-6.jpg",
            inCart:false

        },
        Nirmal1:{
            product:"Nirmal1",
            quantity:0,
            price:20,
            urlSm:"image-lg-7.jpg",
            urlLg:"image-sm-7.jpg",
            inCart:false

        },
        Nirmal2:{
            product:"Nirmal2",
            quantity:0,
            price:20,
            urlSm:"image-lg-8.jpg",
            urlLg:"image-sm-8.jpg",
            inCart:false

        },
        Kondapalli3:{
            product:"Kondapalli3",
            quantity:0,
            price:20,
            urlSm:"image-lg-9.jpg",
            urlLg:"image-sm-9.jpg",
            inCart:false

        }

       

    }
}
export default (state=initialState,action) =>{
    console.log("action",action);
    let productSelected = "";
    switch(action.type){
        case ADD_PRODUCT_BASKET:
            productSelected={...state.products[action.product]}
            productSelected.quantity +=1;
            productSelected.inCart=true;
            return{
                ...state,
                noOfProducts:state.noOfProducts+1,
                cartCost :state.cartCost+state.products[action.product].price,
                products:{
                    ...state.products,
                    [action.product]:productSelected
                }
            }
            case INCREASE_QUANTITY:
                productSelected={...state.products[action.payload]}
                productSelected.quantity +=1;
                productSelected.inCart=true;
    
                return{
                    ...state,
                    noOfProducts:state.noOfProducts+1,
                    cartCost :state.cartCost+state.products[action.payload].price,
                    products:{
                        ...state.products,
                        [action.payload]:productSelected
                    }
                }
                case DECREASE_QUANTITY:
                    productSelected={...state.products[action.payload]}
                    productSelected.quantity -=1;
                    if(productSelected.quantity<0)                   
                    {
                        productSelected.quantity=0
                    }
                    (productSelected.quantity>0)? productSelected.inCart=true: productSelected.inCart=false
                    return{
                        ...state,
                        noOfProducts:state.noOfProducts-1,
                        cartCost :state.cartCost-state.products[action.payload].price,
                        products:{
                            ...state.products,
                            [action.payload]:productSelected
                        }
                    }
                    case CLEAR_PRODUCT:
                        productSelected={...state.products[action.payload]}
                        let numbers = productSelected.quantity;
                            productSelected.quantity=0;
                            productSelected.inCart=false;
                        return{
                            ...state,
                            noOfProducts:state.noOfProducts-numbers,
                            cartCost :state.cartCost-(state.products[action.payload].price*numbers),
                            products:{
                                ...state.products,
                                [action.payload]:productSelected
                            }
                        }
               
        case GET_NUMBERS_BASKET:
            return{
                ...state
            }
        default:
            return state;
    }
}