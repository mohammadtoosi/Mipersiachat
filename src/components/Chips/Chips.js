import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import { CircularProgress } from "@material-ui/core";
import routes from "../../api/routes";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const Chips = () => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    const [chipData, setChipData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchChipsAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(routes.tag, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();

            const transformedChipsData = data.results.map((chip) => {
                return {
                    text: chip.text
                }
            })
            setChipData(transformedChipsData);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChipsAsync();
    }, []);

    let content;
    if (isLoading) {
        content = <CircularProgress style={{ color: UI.primary }} />;
    }
    if (chipData.length > 0 || isLoading === false) {
        content = chipData.map((data) => {
            let icon;
            // if (data.label === "React") {
            //     icon = <TagFacesIcon />;
            // }
            return (
                <li key={data.key}>
                    <Chip
                        icon={icon}
                        label={data.text}
                        className={classes.chip}
                        style={{
                            backgroundColor: dark ? darkMode.card : "",
                            color: dark ? UI.primary : "",
                        }}
                    />
                </li>
            );
        });
    }

    // const handleDelete = (chipToDelete) => () => {
    //     setChipData((chips) =>
    //         chips.filter((chip) => chip.key !== chipToDelete.key)
    //     );
    // };

    return (
        <Paper
            component="ul"
            className={classes.root}
            style={{ backgroundColor: dark ? darkMode.card : "" }}
        >
            {content}
        </Paper>
    );
};

export default Chips;
