import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    console.log("aaaaaaaaaaa", state)

    switch (action.type) {
        case "ADD":
            return [...state, {
                id: action.id,
                CategoryName: action.CategoryName,
                name: action.name,
                img: action.img,
                description: action.description,
                qty: action.qty,
                size: action.size,
                price: action.price
            }];

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr

        case "UPDATE":
            return state.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        qty: parseInt(action.qty) + item.qty,
                        price: action.price + item.price
                    };
                }
                return item;
            });

        case "DROP":
            let emptyArr = [];
            return emptyArr;

        default:
            console.log("Error in reducer");
    }
}


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        console.log("Cart State Updated:", state);
    }, [state]);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
