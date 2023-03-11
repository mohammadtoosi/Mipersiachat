import React from "react";

import classes from "../../styles/Bar.module.css";

const Bar = (props) => {
    return <div className={`${classes.bar} ${props.active === true && classes.active}`}></div>;
};

export default Bar;