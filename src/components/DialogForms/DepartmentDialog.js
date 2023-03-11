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
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     titleChangeHandler();
    //     descChangeHandler();
    // }, [title, description]);

    const departmentData = {
        name: title,
    };

    const onSubmitFormAsync = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.department, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(departmentData),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            setError('مشکلی پیش اومده لطفا صفحه رو رفرش کنید!');
        }
    };

    const department = useSelector((state) => state.dialog.department);
    return (
        <DialogPanel
            title="دپارتمان جدید"
            show={department}
            action1={
                <Button variant="contained" color="primary" type="submit" onClick={onSubmitFormAsync}>
                    اضافه
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
                                label="عنوان"
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
                        <Box display="none" justifyContent="center">
                            <TextField
                                multiline
                                rows={8}
                                margin="dense"
                                id="name"
                                label="توضیحات"
                                type="email"
                                variant="filled"
                                className={classes.textField}
                                style={{
                                    backgroundColor:
                                        dark === true ? dark_mode.card : "",
                                }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </DialogPanel>
    );
};

export default ProfileEditDialog;
