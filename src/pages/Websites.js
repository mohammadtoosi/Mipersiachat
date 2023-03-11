import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { snackbarActions } from "../redux/snackbar";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GridWithTiny from "../components/UI/CustomBreakpoint";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import WebCard from "../components/Card/WebCard";
import UI from "../components/UI/UIDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackbarAlert from "../components/Snackbar/Snackbar";
import routes from "../api/routes";
import AddIcon from "@material-ui/icons/Add";
import AddNewWebsiteDialog from "../components/DialogForms/AddNewWebsiteDialog";
import { dialogActions } from "../redux/dialog";

const useStyles = makeStyles({
    table: {},
    button: {
        backgroundColor: UI.primary,
        color: "#FFFFFF",
    },
    buttonDark: {
        backgroundColor: "#212121",
        color: UI.primary,
    },
    color: {
        color: UI.primary,
        borderBottom: "1px solid #000000",
    },
});
const Websites = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [websites, setWebsites] = useState([]);

    const fetchWebsitesAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoaded(true);
            const response = await fetch(routes.website, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();

            const transformedWebsites = data.results.map((website) => {
                return {
                    id: website.id,
                    key: website.key,
                    url: website.url,
                };
            });
            setWebsites(transformedWebsites);
        } catch (error) {
            setError('مشکلی پیش اومده لطفا صفحه رو رفرش کنید!');
            dispatch(snackbarActions.openSnackbarAlert());
        }
        setIsLoaded(false);
    };

    const websiteDialogClickHandler = () => {
        dispatch(dialogActions.openWebsiteDialog());
    }

    useEffect(() => {
        fetchWebsitesAsync();
    }, []);

    let content;

    if (websites.length > 0) {
        content = websites.map((web) => (
            <GridWithTiny item xs={6} tiny={12} sm={6} md={3} key={web.id}>
                <Box className="hover">
                    <WebCard>{web.url}</WebCard>
                </Box>
            </GridWithTiny>
        ));
    }

    if (isLoaded) {
        content = (
            <Grid item xs={6} sm={6} md={3}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress style={{ color: UI.primary }} />
                </Box>
            </Grid>
        );
    }

    return (
        <Box>
            <Box mx={5}>
                <h4
                    style={{
                        color: dark === true ? UI.primary : UI.menuItemColor,
                    }}
                >
                    وب سایت ها
                </h4>
                <p style={{ color: dark === true ? "#000000" : UI.tabLink }}>
                    شما به وب سایت های زیر دسترسی دارید
                </p>
            </Box>
            <Grid container>
                {content}
            </Grid>
            <Box mx={1} mt="10px">
                    <Button
                        variant={dark === true ? "outlined" : "contained"}
                        startIcon={<AddIcon />}
                        color="default"
                        onClick={websiteDialogClickHandler}
                        className={
                            dark === true ? classes.buttonDark : classes.button
                        }
                    >
                        افزودن وبسایت جدید
                    </Button>
                </Box>
            <SnackbarAlert message={error} type="error" />
            <AddNewWebsiteDialog />
        </Box>
    );
};

export default Websites;
