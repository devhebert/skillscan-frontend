import React, {useContext} from "react";
import "./style.css";
import CustomCard from "../../components/customgenerics/CustomCard";
import {AuthContext} from "../../components/authprovider/AuthContext";
import ChartUser from "../../components/chartuser/ChartUser";
import UserTestResults from "../../components/usertestresults/UserTestResults";

const Home = () => {
    const {userId, role} = useContext(AuthContext);

    return (
        <>
            {role === 'COMMON' && (
                <CustomCard
                    title="Visão Geral"
                    extraLink={""}
                    content={<ChartUser userId={userId}/>
                    }
                />
            )}

            {role === 'ADMIN' && (
                <CustomCard
                    title="Visão Geral"
                    extraLink={""}
                    content={<UserTestResults userId={userId}/>
                    }
                />
            )}
        </>
    );
}

export default Home;