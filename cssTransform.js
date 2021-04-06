const { convertCssStringIntoJsModule } = require('@lsegurado/ls-convert-css-to-js-module');

module.exports = {
    getCacheKey() { // Forces to ignore Jest cache
        return Math.random().toString()
    },
    process(text) {
        return convertCssStringIntoJsModule(text, true).replace('export default', 'module.exports.default =')
    },
};