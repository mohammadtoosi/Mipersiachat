// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { makeStyles } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import UserMenu from "../Menu/UserMenu";
// import UserNav from "../Nav/UserNav";

// // pages
// import MainPage from "../../pages/User/MainPage";
// import Operators from "../../pages/User/Operators";
// import Blocklist from "../../pages/User/Blocklist";

// const useStyles = makeStyles((theme) => ({}));

// const UserLayoutDashboard = (props) => {
//     const classes = useStyles();
//     return (
//         <>
//             <UserNav />
//             <Grid container className={classes.root}>
//                 <Grid item xs={1}>
//                     <Box style={{ display: "flex" }}>
//                         <UserMenu />
//                     </Box>
//                 </Grid>
//                 <Grid item xs={10}>
//                     <Router>
//                         <Switch>
//                             <Route exact path="/">
//                                 <MainPage />
//                             </Route>
//                             <Route path="/operators">
//                                 <Operators />
//                             </Route>
//                             <Route path="/blocklist">
//                                 <Blocklist />
//                             </Route>
//                             <Route path="/colleague"></Route>
//                             <Route path="/question"></Route>
//                             {/* for log out */}
//                         </Switch>
//                     </Router>
//                 </Grid>
//             </Grid>
//         </>
//     );
// };

// export default UserLayoutDashboard;
