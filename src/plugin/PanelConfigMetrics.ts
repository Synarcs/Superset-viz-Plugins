import { t, validateNonEmpty,validateInteger } from '@superset-ui/core';
import { ControlPanelConfig, sections, sharedControls,ControlConfig } from '@superset-ui/chart-controls';

export const chartQueryColumns: {name:string, config: typeof sharedControls.groupby } = {
    name: 'chart_column',
    config: {
      ...sharedControls.groupby,
      label: t('Chart Column'),
      description: t('Columns to group by'),
    }
}

export const chartMetrics: {name: string,config: typeof sharedControls.metrics} = {
  name: 'chart_metrics',
  config: {
    ...sharedControls.metrics,
    validators: [validateNonEmpty],
  },
}


export const BigNumberMetrics: {name: string,config: typeof sharedControls.metrics} = {
    name: 'big_number_metrics',
    config: {
      ...sharedControls.metrics,
      validators: [validateNonEmpty],
    },
}

export const generateControls = (name:string,type:string,label:string,description:string):any => {
    return {
        name,
        config: {
          type,
          label: t(label),
          renderTrigger: true,
          default: true,
          description: t(description),
        },
    }
}
