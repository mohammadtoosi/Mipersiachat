import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Image from "./Image";
import Hidden from "@material-ui/core/Hidden";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Component = ({ form, image, progress, bars }) => {
    const classes = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    
    return (
        <Container fixed>
            <div className={classes.root}>
                <Grid
                    container
                    spacing={!sm && 10}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={12} md={8} lg={6}>
                        <Box p={10}>{form}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={6}>
                        <Hidden xsDown smDown>
                            <Box p={10}>
                                <Image image={image} />
                            </Box>
                        </Hidden>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Component;
