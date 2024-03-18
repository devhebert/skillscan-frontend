
import CustomTable from "../customgenerics/CustomTable";

import React from "react";


const UserTestResults = () => {
    const testResultsColumn = [
        {title: 'Usuário', width: '30%', dataIndex: 'username', key: 'username', align: 'center'},
        {title: 'Tecnologia', width: '30%', dataIndex: 'technologyName', key: 'technologyName', align: 'center'},
        {title: 'Score', width: '30%', dataIndex: 'score', key: 'score', align: 'center'},
        {
            title: 'Número de cursos sugeridos',
            width: '30%',
            dataIndex: 'courseSuggestionsNumber',
            key: 'courseSuggestionsNumber',
            align: 'center'
        },
        {
            title: 'Data',
            width: '30%',
            dataIndex: 'testDate',
            key: 'testDate',
            align: 'center',
            render: (text) => {
                const date = new Date(text);
                return date.toLocaleDateString('pt-BR');
            }
        },
    ];

    return (
        <>
            <CustomTable
                endpoint='http://localhost:8888/api/v1/user-test-results/get-all'
                columns={testResultsColumn}
            />

        </>
    );
}

export default UserTestResults;