import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PanelCard from "../components/Card/PanelCard";
import UI from "../components/UI/UIDetails";
import { useSelector } from "react-redux";

const Blocklist = () => {
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <Container>
            <Box>
                <h4 style={{color: dark ? UI.primary : ''}}>لیست سیاه:</h4>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={6} md={3} lg={2}>
                    <PanelCard title="فهیمی" type="مدیریت فروشگاه"></PanelCard>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={2}>
                    <PanelCard title="فهیمی" type="مدیریت فروشگاه"></PanelCard>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={2}>
                    <PanelCard title="فهیمی" type="مدیریت فروشگاه"></PanelCard>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={2}>
                    <PanelCard title="فهیمی" type="مدیریت فروشگاه"></PanelCard>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={2}>
                    <PanelCard title="فهیمی" type="مدیریت فروشگاه"></PanelCard>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={2}>
                    <PanelCard title="فهیمی" type="مدیریت فروشگاه"></PanelCard>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={2}>
                    <PanelCard title="فهیمی" type="مدیریت فروشگاه"></PanelCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Blocklist;
