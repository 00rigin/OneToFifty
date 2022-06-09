import React, {memo} from 'react';
import Td from './Td';

const Tr = ({rowData, rowIndex, historyData, dispatch}) => {
    // console.log('tr rendered');
    // console.log(rowData);

    return(
        <tr>
            {Array(rowData.length).fill().map((td,i) => (
                <Td key = {i} dispatch = {dispatch} rowIndex = {rowIndex} cellIndex={i} cellData = {rowData[i]} historyData = {historyData}>
                    {''}
                </Td>
            ))}
        </tr>
    );
};

export default memo(Tr);