## Note this a build starting template only can be used to extend Superset Api Functionalities using Superset Custom Plugins 

## Plugin Hosted on Npm registries
https://www.npmjs.com/package/@rs-viz/plugin-chart-rspoc

## @superset-ui/plugin-chart-rspoc

[![Version](https://img.shields.io/npm/v/@rs-viz/plugin-chart-rspoc.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-rspoc)

This plugin provides Viz Chart for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import RspocChartPlugin from '@rs-viz/plugin-chart-rspoc';

new RspocChartPlugin()
  .configure({ key: 'rspoc' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-rspoc) for more details.

```js
<SuperChart
  chartType="rspoc"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```

### File structure generated

```
├── package.json
├── README.md
├── tsconfig.json
├── src
│   ├── Rspoc.tsx
│   ├── images
│   │   └── thumbnail.png
│   ├── index.ts
│   ├── plugin
│   │   ├── buildQuery.ts
│   │   ├── controlPanel.ts
│   │   ├── index.ts
│   │   └── transformProps.ts
│   └── types.ts
├── test
│   └── index.test.ts
└── types
    └── external.d.ts
```