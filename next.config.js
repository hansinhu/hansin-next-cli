const glob = require('glob');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;
const path = require('path');
const fs = require('fs');
const requireHacker = require('require-hacker');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
//const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

function setupRequireHacker() {
    const webjs = '.web.js';
    const webModules = ['antd-mobile', 'rmc-picker'].map(m => path.join('node_modules', m));

    requireHacker.hook('js', filename => {
        if (filename.endsWith(webjs) || webModules.every(p => !filename.includes(p))) return;

        const webFilename = filename.replace(/\.js$/, webjs)
        if (!fs.existsSync(webFilename)) return;

        return fs.readFileSync(webFilename, {
            encoding: 'utf8'
        })
    });

    requireHacker.hook('svg', filename => {
        return requireHacker.to_javascript_module_source(`#${path.parse(filename).name}`)
    })
}

setupRequireHacker();

function moduleDir(m) {
    return path.dirname(require.resolve(`${m}/package.json`))
}
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    //TODO 2.1版本 正式环境使用cdn
    //assetPrefix: isProd ? '//b2c-source.oss-cn-hongkong.aliyuncs.com/trade-new/' : '',
    webpack: (config, {dev}) => {
        //sw
        /*config.plugins.push(
            new SWPrecacheWebpackPlugin({
                verbose: true,
                //minify: true,
                staticFileGlobsIgnorePatterns: [/\assets|components|actions|layouts|out|pages|plugins|reducers\//], //[/\.next\//],
                runtimeCaching: [
                    {
                        handler: 'networkFirst',
                        urlPattern: /^https?.*!/
                    }
                ]
            })
        )*/

        if (ANALYZE) {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: 8888,
                openAnalyzer: true
            }))
        }

        config.resolve.extensions = ['.web.js', '.js', '.json'];

        config.plugins.push(new PreloadWebpackPlugin({
            rel: 'preload',
            include: 'all'
        }));
        config.plugins.push(new LodashModuleReplacementPlugin);
        config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin);
        //config.plugins.push(new webpack.optimize.UglifyJsPlugin);
        config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());

        config.module.rules.push({
            test: /\.(css|less)/,
            loader: 'emit-file-loader',
            options: {
                name: 'dist/[path][name].[ext]'
            }
        }, {
            test: /\.css$/,
            use: ['babel-loader', 'raw-loader', 'postcss-loader']
        }, {
            test: /\.less$/,
            use: ['babel-loader', 'raw-loader', 'postcss-loader', {
                loader: 'less-loader',
                options: {
                    includePaths: ['node_modules']
                        .map((d) => path.join(__dirname, d))
                        .map((g) => glob.sync(g))
                        .reduce((a, c) => a.concat(c), [])
                }
            }]
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-2']
            }

        }, {
            test: /\.(svg)$/i,
            loader: 'emit-file-loader',
            options: {
                name: 'dist/[path][name].[ext]'
            },
            include: [
                moduleDir('antd-mobile'),
                __dirname
            ]
        }, {
            test: /\.(svg)$/i,
            loader: 'svg-sprite-loader',
            include: [
                moduleDir('antd-mobile'),
                __dirname
            ]
        }, {
            test: /\.(woff?|eot|ttf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1000, // 1 KO
                name: 'fonts/[name].[hash:7].[ext]'
            }
        });

        return config
    },
    exportPathMap: function() {
        return {}
    }

};
