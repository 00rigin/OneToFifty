import React, {memo} from 'react';
import Tr from'./Tr';


const Table = ({tableData, historyData,activateButton, dispatch}) => {
    // console.log('at Table');
    // console.log(tableData);
    return(
        <table>
            <tbody>
            {Array(tableData.length).fill().map((tr,i) =>(
                <Tr key = {i} dispatch = {dispatch} rowIndex = {i} rowData = {tableData[i]}
                    historyData = {historyData} activateButton = {activateButton}/>
            ))}
            </tbody>
        </table>
    );

};

export default memo(Table);