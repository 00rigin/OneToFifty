import React, {memo, useCallback} from 'react';
import {CHANGE_TABLE, CLICK_BUTTON} from "./OneToFifty";

const Td = ({rowIndex, cellIndex, activateButton,historyData, dispatch, cellData}) => {
    // console.log('Td rendering');
    // console.log(cellData);

    const onClickButton = ()=>{
        // console.log("at Clicker cellData : " + cellData);
        dispatch({type: CLICK_BUTTON, row : rowIndex, cell: cellIndex, cellData: cellData});
    };

    return(
        <td>
            <button disabled={activateButton[rowIndex][cellIndex]} onClick={onClickButton}>{cellData}</button>
        </td>

    );

};

export default memo(Td);