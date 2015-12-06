import { minify } from 'html-minifier';
import lodash from 'lodash-node';

// Presets borrowed from https://kangax.github.io/html-minifier/
const presets = {
  minimal: {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    minifyJS: true,
    minifyCSS: true,
  },
  safe: {
    removeComments: true,
    removeCommentsFromCdata: true,
    removeCdataSectionsFromCdata: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeEmptyElements: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    caseSensitive: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
  },
  all: {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeIgnored: true,
    removeEmptyElements: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    caseSensitive: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
  },
};

export default function htmlminifier(inputFile, _options = {}) {
  let options = {};

  if (_options.preset && presets[_options.preset]) {
    options = lodash.cloneDeep(presets[_options.preset]);
    delete _options.preset;
  }

  lodash.merge(options, _options);

  return minify(inputFile, options);
}

htmlminifier.defaults = { accept: ['.htm', '.html'] };
