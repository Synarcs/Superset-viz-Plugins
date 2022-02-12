export interface ChartPluginLabels {
    ChartHeader: string; 
    ChartTrailer: string;
    ChartSubHeaders: string;
    setHeader: (headerName:ChartHeaders) => {},
    setTrailer: (trailerName:ChartTrailers) => {},
    setSubHeader: (subHeaderName:SubheaderName) => {},
}

export interface ChartHeaders {
    chartName: string;
    chartVizType: string 
}

export type SubheaderName = string;

export interface ChartTrailers  {
    chartName: string;
    chartVizType: string 
}

export type TimeFormat = string;
export type BigNumber = string;

export type ChartHeaderCombindedProps = ChartTrailers & ChartHeaders & SubheaderName 


// Donout /Pie Chart Props Types 
export interface TransformProps {
    datasetLabels: String[] 
    datasetValues: Number[] 
}

interface datasets {
    label: string,
    backgroundColor: string[],
    hoverBackgroundColor: string[],
    data: number[]
}

export interface ChartProps {
    labels: string[],
    datasets: datasets,
    options ?: any 
}

export type BigNumberReturn = Number | string 
