import React, { useState } from "react";
import { useSelector } from "react-redux";
import DialogPanel from "./DialogPanel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import routes from "../../api/routes";
import { dark_mode } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    textField: {
        [theme.breakpoints.down("xs")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "60ch",
        },
    },
}));

const ProfileEditDialog = () => {
    const question = useSelector((state) => state.dialog.question);
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(null);

    const onSubmitFormAsync = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.question, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    question: title,
                    answer: answer,
                    department: 1,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (err) {
            setError(err);
            console.log(error);
        }
    };

    return (
        <DialogPanel
            title="ویرایش"
            show={question}
            action1={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmitFormAsync}
                >
                    ذخیره
                </Button>
            }
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <form onSubmit={onSubmitFormAsync}>
                        <Box display="flex" justifyContent="center">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="عنوان سوال"
                                type="text"
                                variant="filled"
                                className={classes.textField}
                                style={{
                                    backgroundColor:
                                        dark === true ? dark_mode.card : "",
                                }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <TextField
                                multiline
                                rows={8}
                                margin="dense"
                                id="name"
                                label="جواب"
                                type="password"
                                variant="filled"
                                className={classes.textField}
                                style={{
                                    backgroundColor:
                                        dark === true ? dark_mode.card : "",
                                }}
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </DialogPanel>
    );
};

export default ProfileEditDialog;
