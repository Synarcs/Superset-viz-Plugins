import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {

  const { width, height, formData, queriesData, } = chartProps;
  const { chartMetrics, boldText, headerFontSize, headerText,subheaderText,trailerText,showLabels,labelType,showLegend,legendPosition, isDonut, colorPicker , colorScheme ,chartColumn, outerRadius, bignumberPrefix} = formData;
  const data = queriesData[0].data as TimeseriesDataRecord[];
  const data1 = queriesData[1].data as TimeseriesDataRecord[];
  const data2 = queriesData[2].data as TimeseriesDataRecord[];
  
  console.log('formData via TransformProps.ts', formData);
  console.log(isDonut)
  return {
    width,
    height,
    data,
    data1,
    chartColumn,
    // and now your control data, manipulated as needed, and passed through as props!
    boldText,
    headerFontSize,
    headerText,
    subheaderText,
    trailerText,
    showLabels: isDonut || showLabels,
    labelType,
    showLegend,
    legendPosition, 
    isDonut,
    baseColor: colorPicker,
    colorScheme,
    data2 ,
    outerRadius,
    bignumberPrefix,
    chartMetrics
  };
}
