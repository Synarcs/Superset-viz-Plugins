import React, {createRef,useState,useEffect} from "react";
import { t, CategoricalColorNamespace } from "@superset-ui/core";
import { styled } from "@superset-ui/core";
import { RspocProps, RspocStylesProps } from "./types";
import Pie from "./Components/Pie";
import millify from "millify";
import NumberFormat from "react-number-format";
import CsvDownload from "react-json-to-csv";
import missionsq from "./images/mission_square.jpg";
import nationwide from "./images/nationwide.png";
import axios, { Axios } from "axios";
import {chartOptions,ConvertObject} from './types';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts
export const LABELS_MARGIN = 100;

const Notification = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  color: ${({ theme }) => theme.colors.info.dark1};
  background-color: ${({ theme }) => theme.colors.info.light1};
`;

const Styles = styled.div<PieStylesProps | any>`
  margin: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  & .recharts-legend-item {
    cursor: pointer;
    white-space: nowrap;
  }
`;

export default function Rspie(props: RspocProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width, data1, data2, chartMetrics } = props;
  const { trailerText, headerText, subheaderText } = props;
  const { chartColumn, outerRadius } = props;
  const {
    showLabels,
    labelType,
    showLegend,
    legendPosition,
    isDonut,
    baseColor,
    colorScheme
  } = props;
  const { bignumberPrefix } = props;
  // const {ChartHeader,ChartSubHeaders,ChartTrailer,setHeader,setTrailer,setSubHeader} = useContext(ChartContext);
  const [chartData, setChartData] = useState(data);
  const [bignumberData, setBignumberData] = useState(null);
  const [bu, setBu] = useState<String | null | any>("-1");
  const [notification, setNotification] = useState<string | null>(null);
  const [echartOptions,setEchartsOptions] = useState<any | null>(null);

  const rootRef = createRef<HTMLDivElement>();

  const staticProps = {
    trailerText,
    headerText,
    subheaderText
  };
  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootRef.current as HTMLElement;
    // setHeader(staticProps.headerText);
    // setTrailer(staticProps.trailerText);
    // setSubHeader(staticProps.trailerText)
    if(data1 != null){
     setBignumberData(data1[0][Object.keys(data1[0])[0]]);
    }
    if(data != null){
      setChartData(data); 
      setEchartsOptions(option);
    }
  },[data,data1]);

  //Apache Echarts Configurations 
  
  let option:chartOptions | any = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/> {b} : {c} ({d}%)"
    },
    calculable: true,
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      type: "scroll",
      formatter: (name:any) => {
        let total:Number | any = 0;
        option.dataset.source.forEach((row:any) => (total += row[chartMetrics]));
        const value = option.dataset.source.filter((row:any) => row[chartColumn] === name)[0]
        .chartMetrics;
        const arr = [
        '{a|'+name +'}',
        '{b| '+value[chartMetrics] + ' ' + ((value[chartMetrics] / total) * 100).toPrecision(4) +'%}'
        ]
        return arr.join('\n')
      },
      textStyle: {
        rich: {
          a: {
            fontSize: 14,
            verticalAlign: "top",
            align: "center",
            padding: [5, 0, 0, 0]
          },
          b: {
            fontSize: 14,
            align: "center",
            padding: [1, 0, 1, 0],
            fontWeight: "bold"
          }
        }
      },
      align: "left",
      orient: "vertical",
      padding: 20,
      rich: {
        textBorder: {
          fontSize: 20,
          textBorderColor: "#000",
          textBorderWidth: 3,
          color: "#fff"
        },
        text: {
          margin: 10
        },
        hr: {
          margin: "20px"
        }
      },
      // top: "5%",
      left: "right"

      // selectedMode: "true"
    },

    dataset: {
      source: chartData
    },

    emphasis: {
      label: {
        show: true,
        fontSize: "40",
        fontWeight: "bold"
      }
    },
    labelLine: {
      show: false
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius:  isDonut ? [ outerRadius, outerRadius-50] : [outerRadius],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1
        },
        // color: colorPalette,
        label: {
          show: showLabels,
          position: "inside"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "20",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        // data: [
        //   { value: 1048, name: "Search Engine" },
        //   { value: 735, name: "Direct" },
        //   { value: 580, name: "Email" },
        //   { value: 484, name: "Union Ads" },
        //   { value: 300, name: "Video Ads" }
        // ]
      }
    ]
  }; 

  // staticProps
  console.log("bignumber value is ", bignumberData);

  console.log("Plugin props", props);
  console.log(data, data1);
  

  const downloadFile = (mainobject: ConvertObject | any) => {
    const blob = new Blob([mainobject.data], { type: mainobject.fileType });
    const a = document.createElement("a");
    a.download = mainobject.fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const DownloadJson = (e: any) => {
    e.preventDefault();
    if (chartData != null) {
      downloadFile({
        data: JSON.stringify(chartData),
        fileName: `${headerText}-${Date.now()}.json`,
        fileType: "text/json"
      });
    }
  };

  function exportPDF(e:any) {
    e.preventDefault();
    let image = "";
    try {
      axios
        .get(
          "http://rs-superset-selenium.ssnc-corp.cloud/api/v1/ssnc/current_user_info"
        )
        .then(function (response) {
          const data = response.data;
          console.log("response data is ", data);
          const res = data.split(",");
          console.log("after split ", res);
          setBu(res[res.length - 1]);
          console.log("bu is ", bu);
        });
    } catch {
      console.log(bu);
      setBu("-1");
    }

    if (
      (bu == "-1") ||
      (bu == "rs1@ssnc.com") ||
      (bu == "rs2@ssnc.com") ||
      (bu == "rs5@ssnc.com") ||
      (bu == "rs6@ssnc.com") ||
      (bu == "rs7@ssnc.com")
    ) {
      image = nationwide;
    } else {
      image = missionsq;
    }

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = headerText;
    type pdfHeadersType = Array<Array<String>> | any;
    let pdfHeaders: pdfHeadersType = null;
    if (chartData.length > 0 && chartData != null) {
      pdfHeaders = [Object.keys(chartData[0])];
    }
    if (pdfHeaders == null) {
      alert(
        "The Pdf Data passed is NULL Please Run with Proper Queries and Metrics"
      );
    } else {
      const datapdf: any = chartData.map((elt: any) => {
        const processDataRows: any[] = [];
        pdfHeaders[0].forEach((eachRow: any) => {
          processDataRows.push(elt[eachRow]);
        });
        return processDataRows;
      });
      let content = {
        startY: 100,
        head: pdfHeaders,
        body: datapdf
      };

      const addFooters = (doc:String | any) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.text(
            "Page " + String(i) + " of " + String(pageCount),
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            "right"
          );
        }
      };
      doc.addImage(image, "png", 10, 0, 60, 60);
      doc.text(title, marginLeft, 80);
      doc.autoTable(content);
      addFooters(doc);
      doc.save("report.pdf");
    }
  }

  return (
    <div>
      <div style={{ marginRight: "60%", fontWeight: "bold", padding: "2px" }}>
        {props.headerText}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}>
            <hr style={{ width: "80%", color: "#696969" }} />
            <div style={{ fontSize: "18px", color: "#484848" }}>
                {props.subheaderText}
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            <NumberFormat
              thousandSeparator={true}
              displayType="text"
              isNumericString
              value={bignumberData != null ? millify(bignumberData * 1) : 0}
              prefix={bignumberPrefix}
              renderText={(value:any, props:any) => (
                <div {...props} style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {value}
                </div>
              )}
            />
            </div>
        </div>
      </div>
      <Styles
        height={height}
        width={width}
        ref={rootRef}
      >
        {chartData ? 
            <Pie option={echartOptions} />
            : <span>Loading Plugin...</span>
        }
      </Styles>
      <div style={{ display: "flex" }}>
        <button
          onClick={exportPDF}
          style={{
            borderRadius: "2px",
            border: "None",
            display: "block",
            padding: "3px",
            backgroundColor: "#d2d4d2",
            fontWeight: "bold"
          }}
        >
          Generate Report
        </button>
        <CsvDownload
          data={chartData}
          filename={`${headerText}-${Date.now()}.csv`}
          style={{
            borderRadius: "2px",
            border: "None",
            display: "block",
            padding: "3px",
            backgroundColor: "#d2d4d2",
            fontWeight: "bold",
            marginLeft: "5px"
          }}
        >
          Download csv
        </CsvDownload>
      </div>
    </div>
  );
}
