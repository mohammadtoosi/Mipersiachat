import React from "react";
import { useSelector } from "react-redux";
import { dark_mode as darkMode } from "../UI/UIDetails";
import { Bar } from "react-chartjs-2";

const VerticalBarChart = (props) => {
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <>
            <Bar
                width={700}
                height={500}
                data={props.data}
                options={props.options}
                style={{backgroundColor: dark === true ? darkMode.card : ''}}
            />
        </>
    );
};

export default VerticalBarChart;
