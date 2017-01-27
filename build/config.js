module.exports = {
    entry: {
        app: ['./src/assets/css/app.scss', './src/assets/js/app.js']
    },
    assets_path: 'dist',
    assets_url: '/',
    server_hostname: '0.0.0.0',
    client_hostname: 'app.dev',
    server_port: 3000,
    client_port: 30000,
    browsers: ['last 2 versions', 'ie > 8'],
    debug: process.env.NODE_ENV === 'development'
}
