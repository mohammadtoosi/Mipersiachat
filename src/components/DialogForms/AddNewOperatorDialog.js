import React, { useState, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme } from "@material-ui/core";
import DialogPanel from "./DialogPanel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core";
import routes from "../../api/routes";
import { dark_mode } from "../UI/UIDetails";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    textField: {
        [theme.breakpoints.down("xs")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "50ch",
        },
    },
    selectField: {
        [theme.breakpoints.down("xs")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "50ch",
        },
    },
}));

const initialValue = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    mobile: "",
    job: "",
    department: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "setFirstName":
            return {
                ...state,
                first_name: action.value,
            };
        case "setLastName":
            return {
                ...state,
                last_name: action.value,
            };
        case "setUserName":
            return {
                ...state,
                user_name: action.value,
            };
        case "setPassword":
            return {
                ...state,
                password: action.value,
            };
        case "setPhoneNumber":
            return {
                ...state,
                mobile: action.value,
            };
        case "setEmail":
            return {
                ...state,
                email: action.value,
            };
        case "setJob":
            return {
                ...state,
                job: action.value,
            };
        case "setDep":
            return {
                ...state,
                department: action.value,
            };
        default:
            break;
    }
};

const AddNewOperatorDialog = () => {
    const classes = useStyles();
    const theme = useTheme();

    const operator = useSelector((state) => state.dialog.operator);
    const dark = useSelector((state) => state.darkMode.dark);

    const [state, dispatchReducer] = useReducer(reducer, initialValue);

    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(null);
    const [department, setDepartment] = useState([]);

    useMediaQuery(theme.breakpoints.down("xs"));

    const onInputChange = (type, value) => {
        dispatchReducer({
            type: type,
            value: value,
        });
    };

    const user = {
        first_name: state.first_name,
        last_name: state.last_name,
        username: state.user_name,
        email: state.email,
        mobile: state.mobile,
        job: state.job,
        password: state.password,

        department: state.department,
    };

    const addNewOperatorAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.operator, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log(data);
        } catch (err) {
            setError(err);
            console.log(error);
        }
    };

    const fetchDepartementAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.department, {
                "Content-Type": "application/json",
                Authorization: token,
            });
            const data = await response.json();
            const newDepartmentData = data?.results?.map((dep, counter) => {
                return {
                    key: counter,
                    depId: dep?.id,
                    depName: dep?.name,
                };
            });
            setDepartment(newDepartmentData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDepartementAsync();
    }, []);

    return (
        <DialogPanel
            title="اضافه کردن اپراتور جدید"
            show={operator}
            action1={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addNewOperatorAsync}
                >
                    ذخیره
                </Button>
            }
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام"
                            type="text"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={state.first_name}
                            onChange={(event) => {
                                onInputChange(
                                    "setFirstName",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام خانوادگی"
                            type="text"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={state.last_name}
                            onChange={(event) => {
                                onInputChange(
                                    "setLastName",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام کاربری"
                            type="text"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={state.user_name}
                            onChange={(event) => {
                                onInputChange(
                                    "setUserName",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            margin="dense"
                            id="name"
                            label="ایمیل"
                            type="email"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={state.email}
                            onChange={(event) => {
                                onInputChange("setEmail", event.target.value);
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            margin="dense"
                            id="name"
                            label="نقش"
                            type="text"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={state.job}
                            onChange={(event) => {
                                onInputChange("setJob", event.target.value);
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            margin="dense"
                            id="name"
                            label="شماره تماس"
                            type="email"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={state.mobile}
                            onChange={(event) => {
                                onInputChange(
                                    "setPhoneNumber",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            margin="dense"
                            id="name"
                            label="رمز عبور"
                            type="password"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={state.password}
                            onChange={(event) => {
                                onInputChange(
                                    "setPassword",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            margin="dense"
                            id="name"
                            label="تکرار رمز عبور"
                            type="password"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" mt="5px">
                        <FormControl>
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ marginRight: "10px" }}
                            >
                                دپارتمان
                            </InputLabel>

                            <Select
                                id="demo-simple-select-filled"
                                variant="filled"
                                className={classes.selectField}
                                value={state.department}
                                onChange={(event) => {
                                    onInputChange("setDep", event.target.value);
                                }}
                            >
                                {department?.map((dep) => (
                                    <MenuItem
                                        key={dep.counter}
                                        value={dep.depId}
                                    >
                                        {dep.depName}
                                    </MenuItem>
                                ))}
                                <MenuItem value="">
                                    <em>هیچکدام</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Box
                    mt="20px"
                    style={{ color: dark === true ? dark_mode.primary : "" }}
                >
                    <Checkbox
                        defaultChecked
                        color="primary"
                        style={{ color: dark_mode.primary }}
                    />
                    دسترسی مدیر
                </Box>
            </Grid>
        </DialogPanel>
    );
};

export default AddNewOperatorDialog;
