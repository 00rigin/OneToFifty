import React, {memo} from 'react';
import Td from './Td';

const Tr = ({rowData, rowIndex, dispatch}) => {
    console.log('tr rendered');
    console.log(rowData);

    return(
        <tr>
            {Array(rowData.length).fill().map((td,i) => (
                <Td key = {i} dispatch = {dispatch} rowIndex = {rowIndex} cellData = {rowData[i]}>
                    {''}
                </Td>
            ))}
        </tr>
    );
};

export default Tr;