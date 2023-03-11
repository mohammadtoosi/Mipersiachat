import React from "react";
import Box from "@material-ui/core/Box";
import Bar from "./Bar";

const Progress = (props) => {
    let bar;
    const initialBars = () => {
        switch (props.barNumber) {
            case 0:
                bar = (
                    <Box display="flex" dir="ltr">
                        <Box mx="10px">
                            <Bar />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                    </Box>
                );
                break;
            case 1:
                bar = (
                    <Box display="flex" dir="ltr">
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                    </Box>
                );
                break;
            case 2:
                bar = (
                    <Box display="flex" dir="ltr">
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                    </Box>
                );
                break;
            case 3:
                bar = (
                    <Box display="flex" dir="ltr">
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar />
                        </Box>
                    </Box>
                );
                break;
            case 4:
                bar = (
                    <Box display="flex" dir="ltr">
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                        <Box mx="10px">
                            <Bar active />
                        </Box>
                    </Box>
                );
                break;
            default:
                break;
        }
    };
    initialBars();
    return <> {bar} </>;
};

export default Progress;
