// import React from "react";
// import { TabGroup, Tab } from "react-material-tabs";
// import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
// import TabCard from "../Card/TabCard";
// import UI from "../UI/UIDetails";

// const style = {
//     color: UI.menuItemColor,
// };

// const Tabs = () => {
//     return (
//         <Router>
//             <div dir="ltr">
//                 <TabGroup>
//                     <Link
//                         style={{ color: style.color }}
//                         className="link"
//                         to="/otherCon"
//                     >
//                         <Tab>گفت و گوهای دیگر</Tab>
//                     </Link>
//                     <Link
//                         style={{ color: style.color }}
//                         className="link"
//                         to="/myCon"
//                     >
//                         <Tab>گفت و گو های من</Tab>
//                     </Link>
//                     <Link
//                         style={{ color: style.color }}
//                         className="link"
//                         to="/wait"
//                     >
//                         <Tab>درحال انتظار</Tab>
//                     </Link>
//                 </TabGroup>
//             </div>

//             <Switch>
//                 <Route path="/wait">
//                     <TabCard title="نجمه منشی پور" time="11:11" messages="1">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                     <TabCard title="نجمه منشی پور" time="12:12" messages="2">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                     <TabCard title="نجمه منشی پور" time="12:21" messages="3">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                 </Route>
//                 <Route path="/myCon">
//                     <TabCard title="نجمه منشی پور" time="11:11" messages="4">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                     <TabCard title="نجمه منشی پور" time="12:12" messages="5">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                     <TabCard title="نجمه منشی پور" time="12:21" messages="6">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                 </Route>
//                 <Route path="/otherCon">
//                     <TabCard title="نجمه منشی پور" time="11:11" messages="7">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                     <TabCard title="نجمه منشی پور" time="12:12" messages="8">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                     <TabCard title="نجمه منشی پور" time="12:21" messages="9">
//                         سلام وقت بخیر یه سوال در ارتباط با ...
//                     </TabCard>
//                 </Route>
//             </Switch>
//         </Router>
//     );
// };

// export default Tabs;
