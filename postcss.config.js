module.exports = {
    plugins: [
        require('postcss-easy-import')({
            prefix: '_'
        }),
        require('autoprefixer')({browsers:["last 2 version", "Firefox 15"]})
    ]
}