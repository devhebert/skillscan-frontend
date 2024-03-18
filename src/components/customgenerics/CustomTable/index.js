import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import axios from 'axios';

const CustomTable = ({endpoint, columns}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(endpoint)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar os dados", error);
            });
    }, [endpoint, data]);

    return (
        <Table style={{overflow: "auto", whiteSpace: "nowrap"}} bordered={true} columns={columns} dataSource={data}/>
    );
}

export default CustomTable;
