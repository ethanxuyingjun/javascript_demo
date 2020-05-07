import { Plugin } from '/Users/xue7/workspace/cruddemo_react/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['patchRoutes','rootContainer','render','onRouteChange','dva','getInitialState','locale','locale','request',],
});
plugin.register({
  apply: require('/Users/xue7/workspace/cruddemo_react/src/.umi/plugin-dva/runtime.tsx'),
  path: '/Users/xue7/workspace/cruddemo_react/src/.umi/plugin-dva/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('/Users/xue7/workspace/cruddemo_react/src/.umi/plugin-locale/runtime.tsx'),
  path: '/Users/xue7/workspace/cruddemo_react/src/.umi/plugin-locale/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
