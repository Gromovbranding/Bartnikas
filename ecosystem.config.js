module.exports = {
    apps: [
        {
            name: 'Bartnikas',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}