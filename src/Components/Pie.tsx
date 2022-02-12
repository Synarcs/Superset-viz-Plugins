import React, { PureComponent } from "react";
import ReactEcharts from "echarts-for-react";
import {chartOptions} from '../types'

interface RenderPieProps {
  option: chartOptions 
}

const Pie = (props:RenderPieProps) => {
  return (
      <ReactEcharts
        option={props.option}
        style={{ height: "400px", width: "100%" }}
      />
     
  
  );
};
export default Pie;
