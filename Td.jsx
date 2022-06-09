import React, {memo, useCallback} from 'react';
import {CHANGE_TABLE, CLICK_BUTTON} from "./OneToFifty";

const Td = ({rowIndex, cellIndex, historyData, dispatch, cellData}) => {
    // console.log('Td rendering');
    // console.log(cellData);

    const onClickButton = useCallback(()=>{

        dispatch({type: CLICK_BUTTON, row : rowIndex, cell: cellIndex, cellData: cellData});

    },[]);

    return(
        <td>
            <button onClick={onClickButton}>{cellData}</button>
        </td>

    );

};

export default memo(Td);