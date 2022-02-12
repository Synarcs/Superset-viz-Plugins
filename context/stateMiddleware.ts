import {TransformProps} from './types';
import { BigNumberReturn } from './types';

class ChartQueries {
    transformInternalState = (incomingProps:any):TransformProps => {
      const totalRecords = incomingProps.length;
      let RecordCountLength:any = null;
      if(totalRecords > 0) {
          RecordCountLength = Object.keys(incomingProps[0]).length;
          const selectedColumns:Number = RecordCountLength - 1;
          console.log("selected columns are",selectedColumns);
      }
      console.log(RecordCountLength ? RecordCountLength != null : "Empty Records Props Passed" )
      let datasetLabels:string[] = [] // the root scope for all the combined Queries 
      if((RecordCountLength - 1) == 1){
        datasetLabels = incomingProps.map((individualProps:any) => {
          const requiredkey =  Object.keys(individualProps)[0];
          return individualProps[requiredkey]
       })
      }else{
        // selected multiple group by for the join Queries grouped column Names 
        datasetLabels = incomingProps.map((individualPropsValues:any) => {
          let groupedName:string = ""
          for(let i=0;i<RecordCountLength - 1;i++){
            groupedName += individualPropsValues[Object.keys(individualPropsValues)[i]]
          }
          return groupedName;
        })
      }
      const datasetValues:Number[] = incomingProps.map((individualProps:any) => {
          const requiredkey =  Object.keys(individualProps)[Object.keys(individualProps).length - 1];
          return individualProps[requiredkey]
      })
      return {
          datasetLabels,
          datasetValues
      }
    }

    generateColorScheme = (totalValues:Number):string[] => {
      const sampleeneratedColors = []
      for(let i=0;i<totalValues;i++){
        const randomColorRed = Math.floor(Math.random() * 252)
        const randomColorGreen = Math.floor(Math.random() * 252)
        const randomColorBlue = Math.floor(Math.random() * 252)
        sampleeneratedColors.push(
          `rgba(${randomColorRed},${randomColorGreen},${randomColorBlue},1)`
        )
      }
      return sampleeneratedColors
    }


    generateVizStateTemplate = (incomingProp:any):any => {
      
      const {datasetLabels,datasetValues} = this.transformInternalState(incomingProp)
      const getBackgroundColor = this.generateColorScheme(datasetLabels.length)
      const state = {
        labels: datasetLabels,
        datasets: [
          {
            label: 'Name',
            backgroundColor: getBackgroundColor,
            borderColor: getBackgroundColor,
            data: datasetValues,
            borderWidth: 2
          }
        ]
      }
      return state;
    }
}


class BigNumberQueries {
  generateBigNumberData = (incomingProps:any):BigNumberReturn => {
    const summonedBigQueryAgg = incomingProps.length;
    if(summonedBigQueryAgg == 1){
      const incomingPropsRecordsKeys:String[] = Object.keys(incomingProps[0]) 
      const aggValueQuery = incomingProps[incomingPropsRecordsKeys.length - 1]
      console.log("the sum of the complex agg query is",aggValueQuery);
      return aggValueQuery; // return the agg value sum for each values 
    }
    return`the returned Query with multiple rows ${0}`
  }
}

const cq = new ChartQueries();
const bq  = new BigNumberQueries();

export const generateVizStateTemplate = cq.generateVizStateTemplate
export const generateNumberTemplate = bq.generateBigNumberData
