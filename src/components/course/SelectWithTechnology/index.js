import React, {useEffect, useState} from "react";
import {Form, Select} from "antd";
import axios from "axios";

export const SelectWithTechnology = ({ initialTechnologyId, onChange }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const endpoint = 'http://localhost:8888/api/v1/technology/get-all';

    useEffect(() => {
        axios.get(endpoint)
            .then(response => {
                const sortedData = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setData(sortedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar os dados", error);
                setLoading(false);
            });
    }, [endpoint]);

    return (
        <>
            <Form.Item
                label="Tecnologia"
                name="technologyId"
                initialValue={initialTechnologyId}
                rules={[{required: true, message: 'Por favor, selecione a tecnologia!'},
                    {min: 5, message: 'O nome deve ter pelo menos 5 caracteres!'}]}
            >
                <Select
                    loading={loading}
                    showSearch
                    optionFilterProp="children"
                    placeholder="Selecione a tecnologia"
                    onChange={onChange}
                >
                    {data.map(technology => (
                        <Select.Option key={technology.id} value={technology.id}>
                            {`${technology.name}`}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};