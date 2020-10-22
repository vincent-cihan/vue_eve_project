// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}


// module.exports = {
//     "plugins": {
//         "postcss-import": {},
//         "postcss-url": {},
//         "postcss-aspect-ratio-mini": {},
//         "postcss-write-svg": {utf8: false},
//         "postcss-cssnext": {},
//         "postcss-px-to-viewport": {
//             viewportWidth: 375,
//             unitPrecision: 3,
//             viewportUnit: 'vw',
//             selectorBlackList: ['.ignore', '.hairlines', '.wc', '.novw', '.el', '.ql', '.swiper'],
//             minPixelValue: 1,
//             mediaQuery: false,
//             // exclude: /(\/|\\)(node_modules)(\/|\\)/,
//             exclude: [/\/src\/components\//, /\/src\/pages\/admin\//, /\/src\/pages\/business\//, /\/src\/pages\/donor\//, /\/src\/pages\/portal\//, /\/src\/pages\/finance\//],
//         },
//     }
// }
