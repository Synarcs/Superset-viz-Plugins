import React, { useReducer } from "react";
import {BigNumber} from './types';

const BigNumberContext = React.createContext({
    data: null
})

function BigNumberReducer(state:any,action:any):any{
    switch(action.type){
        default:
            return {
                ...state
            }
    }
}


function BigNumberProvider(props:any){
    const [state,dispatch] = useReducer(BigNumberReducer, {data:null})
    
    return (
        <BigNumberContext.Provider
            value={{
                data:state.data
            }}        
            {...props}
        />
    )
}


export {BigNumberProvider,BigNumberContext}
