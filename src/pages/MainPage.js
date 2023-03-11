import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import UI from "../components/UI/UIDetails";
import PanelCard from "../components/Card/PanelCard";
import Divider from "@material-ui/core/Divider";
import TabChart from "../components/Chart/TabChart";
import { useMediaQuery, useTheme } from "@material-ui/core";
import routes from "../api/routes";
import { CircularProgress } from "@material-ui/core";

const data = {
    labels: ["۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳"],
    datasets: [
        {
            label: "# of Votes",
            data: [1, 0, 3, 5, 15, 5],
            backgroundColor: UI.primary,
            borderWidth: 5,
        },
    ],
};

const data2 = {
    labels: ["۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳"],
    datasets: [
        {
            label: "# of Votes",
            data: [0, 0, 10, 0, 2, 3],
            backgroundColor: UI.primary,
            borderWidth: 5,
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const MainPage = () => {
    const myTheme = useTheme();
    // const xs = useMediaQuery(myTheme.breakpoints.down("xs"));
    const sm = useMediaQuery(myTheme.breakpoints.down("sm"));
    const tiny = useMediaQuery(myTheme.breakpoints.up("tiny"));
    const dark = useSelector((state) => state.darkMode.dark);
    const [operators, setOperators] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chartIsLoading, setChartIsLoading] = useState(false);

    const [chartDataTabOne, setChartDataTabOne] = useState();
    const [chartDataTabTwo, setChartDataTabTwo] = useState();

    const fetchOperatorsAsync = async () => {
        const toekn = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(routes.operator, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: toekn,
                },
            });
            const data = await response.json();

            const transformedOperatorData = data.results.map((op) => {
                return {
                    id: op.id,
                    fullname: op.user.first_name + " " + op.user.last_name,
                    department: op.department.name,
                    isOnline: op.isOnline,
                };
            });
            setOperators(transformedOperatorData);
            setIsLoading(false);
        } catch (error) {
            setError("مشکلی پیش اومده لطفا صفحه رو رفرش کنید!");
        }
    };

    const fetchChartDataAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setChartIsLoading(true);
            const response = await fetch(routes.chartChat, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();

            let labels = [];
            let answered = [];
            let unanswered = [];

            data.forEach((element) => {
                labels.push(element.date);
                answered.push(element.answered);
                unanswered.push(element.unanswered);
            });

            let mainData1 = {
                labels: labels,
                datasets: [
                    {
                        label: "گفت و گو",
                        data: answered,
                        backgroundColor: UI.primary,
                        borderWidth: 5,
                    },
                ],
            };

            let mainData2 = {
                labels: labels,
                datasets: [
                    {
                        label: "گفت و گو",
                        data: unanswered,
                        backgroundColor: UI.primary,
                        borderWidth: 5,
                    },
                ],
            };

            setChartDataTabOne(mainData1);
            setChartDataTabTwo(mainData2);
        } catch (err) {
            console.log(err);
        }
        setChartIsLoading(false);
    };

    useEffect(() => {
        fetchOperatorsAsync();
        fetchChartDataAsync();
    }, []);

    return (
        <Container>
            <Box>
                <Box>
                    <h4
                        style={{
                            color: dark === true ? UI.primary : "#000000",
                        }}
                    >
                        اپراتورها:
                    </h4>
                </Box>
                <Grid container>
                    <Grid item xs={12} sm={12} md={5}>
                        <Box display="flex" justifyContent="center">
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                style={{ marginLeft: "20px" }}
                            >
                                {isLoading && (
                                    <CircularProgress
                                        style={{ color: UI.primary }}
                                    />
                                )}
                                {operators.map((op, i) => (
                                    <div key={i}>
                                        <PanelCard
                                            title={op.fullname}
                                            type={op.department}
                                            online={op.isOnline}
                                        ></PanelCard>
                                    </div>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <Box mt={sm && "30px"}>
                            {chartIsLoading ? (
                                <CircularProgress
                                    style={{ color: UI.primary }}
                                />
                            ) : (
                                <TabChart
                                    data1={chartDataTabOne}
                                    data2={chartDataTabTwo}
                                    options1={options}
                                    options2={options}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Divider />
                </Grid>
            </Box>
        </Container>
    );
};

export default MainPage;
