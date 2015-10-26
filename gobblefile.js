import 'babel/polyfill';
import gobble from 'gobble';
import { CLIEngine } from 'eslint';

const SRC_DIR = 'src';

/**
 * Scripts
 */
const scriptNode = gobble(SRC_DIR)
  .observe(function eslint(inputdir) {
    return new Promise((resolve, reject) => {
      const cli = new CLIEngine();
      const formatter = cli.getFormatter();
      const report = cli.executeOnFiles([inputdir]);
      if (report.errorCount || report.warningCount) {
        reject(formatter(report.results));
      } else {
        resolve();
      }
    });
  })
  .transform('babel')
  .transform('uglifyjs', {
    sourceMap: process.env.ENV !== 'production',
  });

export default gobble([
  scriptNode,
]);
