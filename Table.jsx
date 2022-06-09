import React, {memo} from 'react';
import Tr from'./Tr';


const Table = ({tableData, historyData, dispatch}) => {
    // console.log('at Table');
    // console.log(tableData);
    return(
        <table>
            <tbody>
            {Array(tableData.length).fill().map((tr,i) =>(
                <Tr key = {i} dispatch = {dispatch} rowIndex = {i} rowData = {tableData[i]} historyData = {historyData}/>
            ))}
            </tbody>
        </table>
    );

};

export default memo(Table);