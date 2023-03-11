import React from "react";
import Grid from "@material-ui/core/Grid";

const GridWithTiny = ({ tiny, ...other }) => {
    const tinyClass = `MuiGrid-grid-tiny-${tiny}`;
    return <Grid className={tinyClass} {...other} />;
};

export default GridWithTiny;
