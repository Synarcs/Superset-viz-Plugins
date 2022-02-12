import React, { useReducer } from "react";
import {ChartHeaders,ChartTrailers,SubheaderName} from "./types";
import { TimeFormat } from "./types";
import { validateNonEmpty } from '@superset-ui/core';

const ChartContext = React.createContext({
    ChartHeader: "Total Plan Assets" ,
    ChartTrailer: "View Total Plan Assets", 
    ChartSubHeaders: "Big Number Value",             // will flush data from props using transform props whild building query 
    setHeader: (headerName:ChartHeaders) => {},
    setTrailer: (trailerName:ChartTrailers) => {},
    setSubHeader: (subHeaderName:SubheaderName) => {},
})

function ChartHeaderReducer(state:any,action:any):any{
    switch(action.type){
        case "chart_header": 
            return {
                ...state, 
                ChartHeader: action.payload 
            }
        case "chart_trailer": 
            return {
                ...state, 
                ChartTrailer: action.payload 
            }
        case "chart_subHeader":
            return {
                ...state,
                ChartSubHeaders: action.payload 
            }
        default:
            return {
                ...state
            }
    }
}

function ChartHeaderProvider(props:any){
    const [state,dispatch] = useReducer(ChartHeaderReducer,{ChartHeader: "Total Plan Assets",ChartTrailer:"View Total Plan Assets",ChartSubHeaders:"Big Number Value"})
    const  setHeader = (ChartHeader:ChartHeaders) =>{
        const {chartName,chartVizType} = ChartHeader;
        console.log("init dispatch State");
        dispatch({
            type: "chart_header",
            payload: chartName 
        })
    }
    const  setTrailer = (trailerName:ChartHeaders) =>{
        const {chartName,chartVizType} = trailerName;
        dispatch({
            type: "chart_trailer",
            payload: chartName 
        })
    }
    const  setSubHeader = (subHeaderName:ChartHeaders) =>{
        dispatch({
            type: "chart_subHeader",
            payload: subHeaderName 
        })
    }
    return (
        <ChartContext.Provider
            value={{
                ChartHeader:state.ChartHeader,
                ChartTrailer:state.ChartTrailer,
                ChartSubHeaders:state.ChartSubHeaders,
                setHeader,
                setTrailer,
                setSubHeader
            }}        
            {...props}
        />
    )
}

export {ChartHeaderProvider,ChartContext}
