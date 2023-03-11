import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { snackbarActions } from "../../redux/snackbar";
import { makeStyles } from "@material-ui/core";
import DialogPanel from "./DialogPanel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import SnackbarAlert from "../Snackbar/Snackbar";
import routes from "../../api/routes";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import { dark_mode } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    textField: {
        [theme.breakpoints.down("xs")]: {
            width: "30ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "58ch",
        },
    },
    selectField: {
        [theme.breakpoints.down("xs")]: {
            width: "58ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "58ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "58.5ch",
        },
    },
}));

const ProfileEditDialog = () => {
    const website = useSelector((state) => state.dialog.website);
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    const [title, setTitle] = useState("");
    const [select, setSelect] = useState("");
    const [dashboard, setDashboard] = useState([]);
    const [error, setError] = useState("");

    const AddNewWebsiteAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.website, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    url: title,
                    dashboard: select,
                }),
            });
            const data = await response.json();
        } catch (err) {
            setError(
                "مشکلی در افزودن وبسایت پیش اومده! لطفا دوباره امتحان کنید"
            );
        }
    };

    const fetchDashboardAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.dashboard, {
                headers: {
                    "Content-Type": token,
                    Authorization: token,
                },
            });
            const data = await response.json();
            setDashboard(data);
        } catch (err) {
            setError(
                "مشکلی در بروزرسانی داشبورد پیش امده! لطفا دوباره امتحان کنید"
            );
        }
    };

    useEffect(() => {
        fetchDashboardAsync();
    }, []);

    const selectChangeHandler = (e) => {
        setSelect(e.target.value);
    };

    return (
        <DialogPanel
            title="افزودن وبسایت جدید"
            show={website}
            action1={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={AddNewWebsiteAsync}
                >
                    افزودن
                </Button>
            }
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <form>
                        <Box display="flex" justifyContent="center">
                            <FormControl
                                variant="filled"
                                className={classes.formControl}
                            >
                                <InputLabel
                                    id="demo-simple-select-filled-label"
                                    style={{ color: dark ? UI.primary : "" }}
                                >
                                    ادرس
                                </InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    type="text"
                                    variant="filled"
                                    className={classes.textField}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <FormControl
                                variant="filled"
                                className={classes.formControl}
                            >
                                <InputLabel
                                    id="demo-simple-select-filled-label"
                                    style={{ color: dark ? UI.primary : "" }}
                                >
                                    انتخاب داشبورد
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={select}
                                    onChange={selectChangeHandler}
                                    className={classes.selectField}
                                >
                                    {dashboard?.results?.map((d, i) => (
                                        <MenuItem key={i} value={d.superUser}>
                                            {d.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </form>
                </Grid>
            </Grid>
            <SnackbarAlert message={error} type="error" />
        </DialogPanel>
    );
};

export default ProfileEditDialog;
