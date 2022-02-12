import { t, validateNonEmpty,validateInteger } from '@superset-ui/core';
import { ControlPanelConfig, sections, sharedControls,ControlConfig } from '@superset-ui/chart-controls';
import {chartQueryColumns,chartMetrics,BigNumberMetrics} from './PanelConfigMetrics'; // metrics Query 
import {generateControls} from './PanelConfigMetrics'; // metrics ChartOptions 
import { LabelTypeNames, LabelTypes, LegendPosition } from '../utils';
import { formatSelectOptions } from '@superset-ui/chart-controls';

const showLabels = {
  name: 'show_labels',
  config: {
    type: 'CheckboxControl',
    label: t('Show Labels'),
    renderTrigger: true,
    default: true,
    description: t('Whether to display the labels. Note that the label only displays when the the 5% threshold.'),
  },
};

const labelType = {
  name: 'label_type',
  config: {
    type: 'SelectControl',
    label: t('Label Type'),
    default: LabelTypes.percent,
    renderTrigger: true,
    choices: Object.values(LabelTypes).map(val => [val, LabelTypeNames[val as LabelTypes]]),
    description: t('What should be shown on the label?'),
  },
};

const showLegend = {
  name: 'show_legend',
  config: {
    type: 'CheckboxControl',
    label: t('Show Legend'),
    renderTrigger: true,
    default: true,
    description: t('Whether to display the legend (toggles)'),
  },
};

const legendPosition = {
  name: 'legend_position',
  config: {
    freeForm: true,
    type: 'SelectControl',
    clearable: false,
    label: t('Legend position'),
    renderTrigger: true,
    choices: formatSelectOptions(Object.keys(LegendPosition)),
    default: 'top',
    description: t('Set legend position'),
  },
};

const isDonut = {
  name: 'is_donut',
  config: {
    type: 'CheckboxControl',
    label: t('Donut'),
    default: false,
    renderTrigger: true,
    description: t('Do you want a donut or a pie?'),
  },
};


const config: ControlPanelConfig = {
  // individaul root control pane for the plugin 
controlPanelSections: [
     sections.legacyRegularTime,
     {
       label: t('Chart Query'),
       expanded: true,
       controlSetRows: [
         [chartQueryColumns],
         [chartMetrics],
         ['adhoc_filters'],
         [
           {
             name: 'row_limit',
             config: sharedControls.row_limit,
           },
         ],
       ],
     },
     {
      label: t('Big Number Query'),
      expanded: true,
      controlSetRows: [
        // control set rows removed will use the physical/virtual dataset base or virtual queries 
        [BigNumberMetrics],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },{
      label: t("Iframe Table View"),
      expanded: true,
      controlSetRows: [
         [
           {
             name: "iframe_viewer",
             config: {
               ...sharedControls.columns,
               label: t("iframe_viewer"),
               description: t('Columns Selection for Raw Data Viewer'),
               renderTrigger: false
             }
           }
         ]
      ]
    },{
       label: t('Plugin Controls!'),
       expanded: true,
       controlSetRows: [
         [
           {
             name: 'header_text',
             config: {
               type: 'TextControl',
               default: 'Chart Tiltle',
               renderTrigger: true,
               label: t('Header Text'),
               description: t('The text you want to see in the header'),
             },
           },
         ],
         [
           {
             name: 'bold_text',
             config: {
               type: 'CheckboxControl',
               label: t('Bold Text'),
               renderTrigger: true,
               default: true,
               description: t('A checkbox to make the '),
             },
           },
         ],
         [
           {
             name: 'subheader_text',
             config: {
                type: 'TextControl',
                default: 'Big Number ',
                renderTrigger: true,
                // ^ this makes it apply instantaneously, without triggering a "run query" button
                label: t('Subheader Text'),
                description: t('The text you want to see in the sub header'),
              },
           },
         ],
	 [
           {
            name: "bignumber_prefix",
            config:{
              type: "TextControl",
              renderTrigger: true,
              label: t('BigNumber Prefix'),
              description: t("Big Number Prefix")
            }
           }
         ],
             
         [
          {
            name: 'trailer_text',
            config: {
               type: 'TextControl',
               default: 'Trailer text',
               renderTrigger: true,
               // ^ this makes it apply instantaneously, without triggering a "run query" button
               label: t('Trailer text'),
               description: t('The text you want to see in the link'),
             },
          },
         ],[
          {
            name: "trailer_query",
            config: {
              type: "TextControl",
              default: "",
              renderTrigger: false,
              label: t("Trailer DataSource Query"),
              description: t("The DataSource for Trailer Explore Chart View")
            }
          }
        ],
    	  ['color_scheme', 'label_colors'],
        [isDonut],
        [showLabels, labelType],
        [showLegend, legendPosition],
        [{
          name: "outer_Radius",
          config: {
            type: "TextControl",
            default: "",
            renderTrigger: true,
            label: t("Radius of pie chart"),
            description: t("Outer radius of pie chart")
          }
        }]
       ],
     },
   ],
 };
 
 export default config;
