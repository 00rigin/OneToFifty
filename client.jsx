import React from 'react';
import ReactDom from 'react-dom';
import OneToFifty from './OneToFifty'
// import ResponseChecker from './responseChecker'; // defualt로 객체를 반환한 경우에는 impoer로 가져옴. 배열 등으로 반환하는 hook의 경우 require를 사욯

import TicTacToe from './OneToFifty';

// 아래의 WordPlay 클래스를 wordplay.jsx에서 불러옴. 이를 통해 각 컴포넌트를 분리해서 수정할 수 있음
// ReactDom.render(<ResponseChecker/>, document.querySelector('#root'));
ReactDom.render(<OneToFifty/>, document.querySelector('#root'));


