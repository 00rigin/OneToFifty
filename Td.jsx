import React, {useCallback} from 'react';
import {CLICK_BUTTON} from "./OneToFifty";

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
    console.log('Td rendering');
    console.log(cellData);

    const onClickButton = useCallback(()=>{
        console.log("Click the button");
        if(cellData){
            return;
        }
        dispatch({type: CLICK_BUTTON, row: rowIndex, cell: cellIndex});

    },[]);

    return(

        <button onClick={onClickButton}>{cellData}</button>
    );

};

export default Td;