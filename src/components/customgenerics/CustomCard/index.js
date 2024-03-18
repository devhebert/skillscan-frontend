import React from "react";
import { Card } from "antd";

const CustomCard = ({ title, content, extraLink }) => {
    return (
        <Card style={{ minHeight: "760px"}} type="inner" title={title} extra={extraLink}>
            {content}
        </Card>
    )
}

export default CustomCard;