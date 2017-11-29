/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../config/webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via Webpack. This will take a while...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold);
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error));
  }

  if(jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log('Your app has been compiled in production mode :)'.green);
  
  return 0;
});
