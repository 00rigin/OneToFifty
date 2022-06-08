import React, {useState, useReducer, useCallback, useRef, useMemo, useEffect} from 'react';
import Table from "./Table";

const initialState = {
    tableData:[],
    activateButton: [
        [].fill(true,0,5),
        [].fill(true,0,5),
        [].fill(true,0,5),
        [].fill(true,0,5),
        [].fill(true,0,5)
    ],
    setNumber : 1,
    numberHistory:0
};

export const SET_TABLE_DATA = 'SET_TABLE_DATA';
export const CLICK_BUTTON = 'CLICK_BUTTON';
export const CHANGE_TABLE = 'CHANGE_TABLE';
// export const SET_SET_NUMBER = 'SET_SET_NUMBER';

const reducer = (state, action) => {
    console.log("@ reducer");
    console.log(action.tableData);
    switch (action.type){
        case SET_TABLE_DATA:
            return{
                ...state,
                tableData: action.tableData,
            };
        case CLICK_BUTTON:
            return{
                ...state,
                activateButton: action.

            };
        case CHANGE_TABLE:
            return{
              ...state,
              setNumber: action.setNumber,
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

}

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
}

const OneToFifty = () => {
    const numbers1 = useMemo( () => numberShuffler(1), []);
    const numbers2 = useMemo(() => numberShuffler(26), [])
    const [redo, setRedo] = useState(false);


    const timeOut = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, setNumber, activateButton, numberHistory} = state;

    console.log(numbers1);
    console.log(numbers2);

    useEffect(() => {
        let set = setNumber;

        if(setNumber === 1){
            dispatch({type: SET_TABLE_DATA, tableData: setTableNumber(numbers1)});
            console.log(setTableNumber(numbers1));

        }
        else if (setNumber === 2){
            dispatch({type: SET_TABLE_DATA, tableData: setTableNumber(numbers2)})
        }


    },[setNumber]); // 세트 넘버 바뀌면 리랜더링 ( 숫자 다시 뿌림)


    const onClickListener = useCallback((e)=> {

        if(e.target.value != state.numberHistory+1){ // 틀린 숫자 클릭릭
            // 틀린부분 처리할 곳
            console.log("틀린 숫자 누름. 예상 : " + (state.numberHistory+1) );
        }
        else{
            if(e.target.value === 1){
                // 타이머 시작하는 부분
            }
            else if(e.target.value === 25){
                dispatch({type:CHANGE_TABLE, setNumber: 2});
                // 테이블 바꿔야함
            }
            else if(e.target.value === 50){
                // 타이머 끝나기
                // 리셋버튼 활성화
            }

        }



       dispatch({type: CLICK_BUTTON})
    },[]);





    return(
        <>
            <Table onClick = {onClickListener} tableData = {state.tableData} dispatch = {dispatch}/>
            {/*{timer}*/}
            {/*<button onClick={onReset}>다시 시작</button>*/}

        </>

    )
};

export default OneToFifty;
