import React, {useState, useReducer, useCallback, useRef, useMemo, useEffect} from 'react';
import Table from "./Table";
import StopWatch from "./StopWatch";

const initialState = {
    tableData:[],
    activateButton: [
        [].fill(false,0,5),
        [].fill(false,0,5),
        [].fill(false,0,5),
        [].fill(false,0,5),
        [].fill(false,0,5)
    ],
    setNumber : 1,
    numberHistory:0,
    timerIsRunning: false,
    reset: false,
};

export const SET_TABLE_DATA = 'SET_TABLE_DATA';
export const CLICK_BUTTON = 'CLICK_BUTTON';
export const CHANGE_TABLE = 'CHANGE_TABLE';
export const RESET = 'RESET';
// export const SET_SET_NUMBER = 'SET_SET_NUMBER';

const reducer = (state, action) => {
    // console.log("@ reducer");
    // console.log(action.tableData);
    switch (action.type){
        case SET_TABLE_DATA:
            return{
                ...state,
                tableData: action.tableData,
                setNumber: action.setNumber,
                activateButton: [
                    [].fill(false,0,5),
                    [].fill(false,0,5),
                    [].fill(false,0,5),
                    [].fill(false,0,5),
                    [].fill(false,0,5)
                ],
            };
        case CLICK_BUTTON:
            let inputSetNumber = state.setNumber;
            let ToChangeNumberOrder = state.numberHistory;
            let ToChangeTimerIsRunning = state.timerIsRunning;
            let ToChangeReset = state.reset;
            let activateButton = state.activateButton;

            if(action.cellData != ToChangeNumberOrder+1){ // 틀린 숫자 클릭릭
                // 틀린부분 처리할 곳

                console.log("틀린 숫자 누름. 예상 : " + (ToChangeNumberOrder+1) );
                console.log("현재 : " + action.cellData );
            }
            else{
                if(action.cellData === 1){
                    // 타이머 시작하는 부분
                    ToChangeReset = false;
                    ToChangeTimerIsRunning = true;
                }
                else if(action.cellData === 25){
                    inputSetNumber = 2;
                    // 테이블 바꿔야함
                }
                else if(action.cellData === 50){
                    // 타이머 끝나기
                    // 리셋버튼 활성화
                    ToChangeTimerIsRunning = false;
                }

                ToChangeNumberOrder++;

                activateButton = [...state.activateButton];
                activateButton[action.row] = [...activateButton[action.row]];
                activateButton[action.row][action.cell] = true;
            }

            // ///////////Test////////////////
            // if(action.cellData === 1){
            //     // 타이머 시작하는 부분
            //     ToChangeReset = false;
            //     ToChangeTimerIsRunning = true;
            //
            // }
            // else if(action.cellData === 25){
            //     inputSetNumber = 2;
            //     // 테이블 바꿔야함
            // }
            // else if(action.cellData === 50){
            //     // 타이머 끝나기
            //     ToChangeTimerIsRunning = false;
            // }
            // ToChangeNumberOrder++;
            // activateButton = [...state.activateButton];
            // activateButton[action.row] = [...activateButton[action.row]];
            // activateButton[action.row][action.cell] = true;
            // ////////////////////////////////////////////



            // console.log("row : "+action.row);
            // console.log("cell : "+action.cell);

            return{
                ...state,
                activateButton,
                numberHistory: ToChangeNumberOrder,
                setNumber: inputSetNumber,
                timerIsRunning: ToChangeTimerIsRunning,
                reset: ToChangeReset,
            };
        case CHANGE_TABLE:
            return{
              ...state,
              setNumber: action.setNumber,
            };
        case RESET:
            return{
                ...state,
                setNumber: 0,
                numberHistory:0,
                timerIsRunning: false,
                reset: true,
            };

        default:
            return state;
    }
};


const numberShuffler = (startNum) => { // start num 부터 25개 셔플된 값 만들어줌
    // console.log("number shuffle start");
    const candidate = Array(25).fill().map((v,i) => i+startNum);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0]);
    }
    // console.log(shuffle);
    return [...shuffle];

};

const setTableNumber = (numbers) => {
    const tableData = [];
    let counter = 0;
    for(let i = 0; i<5; i++){
        let tableRow = [];
        for(let j = 0; j<5; j++){
            tableRow.push(numbers[counter]);
            counter++;
        }
        tableData.push(tableRow);
    }
    return tableData;
};



const OneToFifty = () => {
    // const numbers1 = useMemo( () => numberShuffler(1), []);
    // const numbers2 = useMemo(() => numberShuffler(26), []);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {setNumber, reset} = state;


    const onReset = () => {
        dispatch({type: RESET});
    };

    useEffect(() => {
        let set = setNumber;

        // console.log("@tablesetter setNumber : "+set);

        let numbers1 = numberShuffler(1);
        let numbers2 = numberShuffler(26);


        if(set === 1 || set === 0){

            dispatch({type: SET_TABLE_DATA, tableData: setTableNumber(numbers1), setNumber: 1});
        }
        else if (set === 2){

            dispatch({type: SET_TABLE_DATA, tableData: setTableNumber(numbers2), setNumber: 2});
        }

    },[setNumber]); // 세트 넘버 바뀌면 리랜더링 ( 숫자 다시 뿌림)

    return(
        <>
            <Table tableData = {state.tableData} historyData = {state.numberHistory} activateButton = {state.activateButton} dispatch = {dispatch}/>
            <StopWatch timerIsRunning={state.timerIsRunning} reset={state.reset}/>
            <button onClick={onReset}>reset</button>

        </>

    )
};

export default OneToFifty;
