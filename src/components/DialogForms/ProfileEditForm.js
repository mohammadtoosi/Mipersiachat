import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import UI from "../UI/UIDetails";

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
    pic: {
        background: UI.primary,
        borderRadius: "150px",
    },
}));

const ProfileEditForm = () => {
    const classes = useStyles();

    return (
        <Grid container justifyContent="center">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                style={{cursor: 'pointer'}}
            >
                <Box className={classes.pic}>
                    <Box p={1}>
                        <PersonIcon
                            style={{ fontSize: "150px", color: "#FFFFFF" }}
                        />
                    </Box>
                </Box>
                <h4>تغییر پروفایل</h4>
            </Box>
            <Grid item xs={12} sm={12} md={12}>
                <Box display="flex" justifyContent="center">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="نام و نام خانوادگی"
                        type="text"
                        variant="filled"
                        className={classes.textField}
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
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProfileEditForm;
