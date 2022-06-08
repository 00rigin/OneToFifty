// 컴포넌트를 여러개로 쪼갰지만, html에서는 하나의 js 파일로 읽어야함.
// 이를 위해 웹팩을 사용해서 쪼개져있는 것들을 하나로 통합함

const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: "word-play-setting", // 그냥 구분을 위한 이름
    mode: 'development', // 실서비스시 production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'], // 엔트리에 들어갈 파일의 확장자명을 넣어놓으면 알아서 엡팩이 처리해줌
    },

    // 입력 (쪼개져있는 컴포넌트 파일)
    entry:{
        // app: ['./client', './WordPlay'], // 이 파일을 하나로 합쳐줌 이렇게 써도 되지만, client에서 이미 wordplay를 불러오고 있기 때문에 아래처럼 써도 됨.
        app: ['./client'],
    }
    ,
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {browsers: ['last 2 chrome versions']},
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: ['react-refresh/babel'],
            },
            exclude: path.join(__dirname, 'node_modules'),
        }],
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'dist'), // 실제 경로
        filename: '[name].js',
        publicPath: '/dist', // 가상의 경로
    },
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    }



};
// 이렇게 설정 한 후 터미널에 webpack 명령 치면 실행됨.
// 하지만 webpack 명령어가 등록이 안되어있기 때문에 package.json 안에 스크립트 명령어를 따로 넣어줌.
// 그 후 npm run "명령어"

// 또는 그냥 npx webpack 으로 알아서 처리되도록도 가능함.