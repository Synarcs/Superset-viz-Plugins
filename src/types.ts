/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 import { QueryFormData, supersetTheme, TimeseriesDataRecord } from '@superset-ui/core';

 export interface RspocStylesProps {
   height: number;
   width: number;
   headerFontSize: keyof typeof supersetTheme.typography.sizes;
   boldText: boolean;
 }
 
 interface RspocCustomizeProps {
   headerText: string;
   trailerText: string;
   subheaderText: string;
   showLegend: boolean;
   showLabels: boolean;
   labelType: string;
   isDonut?: boolean;
   colorScheme: string | any; 
   baseColor: string | any;
   legendPosition: any;
   onClick?: any;
 }
 
export type chartOptions =  {
  tooltip: {
    trigger: string,
    formatter: string
  },
  calculable: any | boolean,
  toolbox: {
    show: boolean,
    feature: {
      mark: { show: boolean },
      dataView: { show: boolean, readOnly: boolean },
      restore: { show: boolean },
      saveAsImage: { show: boolean }
    }
  },
  legend: {
    type: string,
    formatter:any = (name:any) => {},
    align: String,
    orient: String,
    padding: Number,
  },
  textStyle:{ rich ?: {
        a?: {
          fontSize: Number,
          verticalAlign: String,
          align: String,
          padding: Array<Number> |,
        },
        b?: {
          fontSize: Number,
          align: String,
          padding: Number[],
          fontWeight: String
        }
      },
    }
  dataset: {
    source: any   
  },
  emphasis: {
    label: {
      show: true,
      fontSize: String,
      fontWeight: String
    }
  },
  labelLine: any,
  series: Array<Series>
}

interface Series {
    name: String,
    type: String,
    radius: Array<any>,
    avoidLabelOverlap: boolean,
    itemStyle: {
      borderRadius: Number,
      borderColor: String,
      borderWidth: Number
    },
    // color: colorPalette,
    label: {
      show: any,
      position: String
    },
    emphasis: {
      label: {
        show: true,
        fontSize: String,
        fontWeight: String
      }
    },
    labelLine: {
      show: false
    }
}

export type ConvertObject = {
  data: String | any;
  fileName: String | any;
  fileType: String | any;
}

export type RspocQueryFormData = QueryFormData &
  RspocStylesProps &
  RspocCustomizeProps;

export type RspocProps = RspocStylesProps &
  RspocCustomizeProps & {
    data: TimeseriesDataRecord[];
    data1: TimeseriesDataRecord[];
    data2: TimeseriesDataRecord[];
    chartMetrics: any | String;
    chartColumn: String | any;
    outerRadius: Number | any;
    bignumberPrefix: String | any 
    // add typing here for the props you pass in from transformProps.ts!
  } 
