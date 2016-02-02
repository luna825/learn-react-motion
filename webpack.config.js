process.env.NODE_ENV = process.env.NODE_ENV || 'production'

var webpack=require('webpack')

var plugins = [new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})]

var entry={
    'simple-transition':'./Components/simple-transition/app.js',
    'chat-header':'./Components/chat-header/app.js',
    'draggable-balls':'./Components/draggable-balls/app.js'
}
if (process.env.NODE_ENV==='development'){
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ])
    entry = Object.keys(entry).reduce(function(result,key) {
        result[key]=[
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:3000',
            entry[key]
        ];
        return result;
    },{})
}

module.exports={
    devtool:'eval-source-map',
    entry:entry,
    output:{
        filename:'[name]/bundle.js',
        path:__dirname+'public',
        publicPath:'/public/'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel',
                query:{
                    presets:['react','es2015']
                }
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {test: /\.(jpg|png)$/, loader: "url?limit=8192"}
        ]
    },
    plugins:plugins
}