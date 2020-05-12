/**
 * Application configuration section
 */

module.exports = {
    apps: [{
        name: 'nodejsTest-server',
        script: 'bin/www',
        node_args: " --max_old_space_size=3072",
        watch: ['requirements', 'routes', 'app.js'],
        log_date_format: "YYYY-MM-DD HH:mm:ss",
        env: {
            COMMON_VARIABLE: 'true'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],
};