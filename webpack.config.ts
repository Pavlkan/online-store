const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    output: {
        path: path.resolve(__dirname, 'build'),
        clean: true,
        filename: 'main.ts'
    }
}