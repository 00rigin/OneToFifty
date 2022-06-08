import React from 'react';
import Tr from'./Tr';


const Table = ({tableData, dispatch}) => {
    console.log('at Table');
    console.log(tableData);
    return(
        <table>
            <tbody>
            {Array(tableData.length).fill().map((tr,i) =>(
                <Tr key = {i} dispatch = {dispatch} rowIndex = {i} rowData = {tableData[i]}/>
            ))}
            </tbody>
        </table>
    );

};

export default Table;