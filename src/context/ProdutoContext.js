import React, { createContext, useReducer } from "react";
import produtos from '../data/produtos'

const initialState = { produtos }
const ProdutoContext = createContext({})

const actions = {
    createProduto(state, action) {
        const produto = action.payload
        produto.id = Math.random()
        return {
            ...state,
            produtos: [...state.produtos, produto],
        }
    },
    updateProduto(state, action) {
        const updated = action.payload
        return {
            ...state,
            produtos: state.produtos.map(u => u.id === updated.id ? updated : u)
        }
    },
    deleteProduto(state, action) {
        const produto = action.payload
        return {
            ...state,
            produtos: state.produtos.filter(u => u.id !== produto.id)
        }
    }
}

export const ProdutosProvider = props => {

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ProdutoContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ProdutoContext.Provider>
    )
}

export default ProdutoContext