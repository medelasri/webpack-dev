module.exports = {
    entry: {
        app: ['./src/assets/js/app.js']
    },
    assets_path: 'dist',
    assets_url: '/',
    filename: 'bundle',
    server_hostname: '0.0.0.0',
    client_hostname: 'tabs.dev',
    server_port: 3000,
    client_port: 30000,
    hot_reload: true,
    uglifyJs: {
        sourceMap: true,
        comments: false,
        compress: {
            warnings: false
        }
    },
    css: {
        minify: true,
        autoprefixer: true
    },
    debug: process.env.NODE_ENV === 'development'
}
