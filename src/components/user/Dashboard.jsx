import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../../assets/css/dashboard.css";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { ListDashBoard } from "../expense/ListDashBoard";
import dayjs from "dayjs";
import { CustomeLoader } from "../CustomeLoader";
ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  //-----------list of expense for chart-------------------------------------
  const [medical, setmedical] = useState();
  const [grocery, setgrocery] = useState();
  const [fuel, setfuel] = useState();
  const [shooping, setshopping] = useState();
  const [other, setother] = useState();
  const [revenues, setrevenues] = useState();
  const [expensMT, setexpensMT] = useState();
  const [goalTotal, setgoalTotal] = useState()
  const [saving, setsaving] = useState();
  const [bill, setbill] = useState();
  const [chartBarData, setchartBarData] = useState([]);


  let charData = [];
  
  const getExpenseList = async () => {
    const id = localStorage.getItem("id");
    let totalgrocery = 0,
      totalfuel = 0,
      totalshooping = 0,
      totalother = 0,
      totalmedical = 0,
      totalbill = 0,
      totalGoal = 0;
      
    const res = await axios.get(`/api/expense/${id}`);
    // console.log("res",res)
    res?.data?.data.forEach((am) => {

      if (am.category.name == "grocery") {
        totalgrocery += am.amount;
      } else if (am.category.name == "fuel") {
        totalfuel += am.amount;
      } else if (am.category.name == "medical") {
        totalmedical += am.amount;
      } else if (am.category.name == "shooping") {
        totalshooping += am.amount;
      } else if (am.category.name == "bill") {
        totalbill += am.amount;
      } else {
        totalother += am.amount;
      }

      if(am.goal != null){
          totalGoal+=am.amount
      }

    });
    setfuel(totalfuel);
    setgrocery(totalgrocery);
    setmedical(totalmedical);
    setother(totalother);
    setshopping(totalshooping);
    setbill(totalbill);
    setgoalTotal(totalGoal)

    const groupedExpenses = {};

    const res1 = await axios.get(
      `/api/getrevenue/${localStorage.getItem("id")}`
    );

    res?.data?.data.forEach((expense) => {
      const month = dayjs(expense.date).format("MMM");

      if (!groupedExpenses[month]) {
        groupedExpenses[month] = [];
      }
      groupedExpenses[month].push(expense);
    });
    res1?.data?.data.forEach((expense) => {
      const month = dayjs(expense.date).format("MMM");

      if (!groupedExpenses[month]) {
        groupedExpenses[month] = [];
      }
      groupedExpenses[month].push(expense);
    });


    let sumMWE = 0,
      sumMWI = 0;
      
    for (const month in groupedExpenses) {
      if (Object.hasOwnProperty.call(groupedExpenses, month)) {
     
        // Access the array of data for the current month
        const dataArray = groupedExpenses[month];

        // Iterate over each data item in the array
        sumMWE = 0;
        sumMWI = 0;

        dataArray.forEach((item) => {
          if (item?.amount) {
            sumMWE += item.amount;
          } else {
            sumMWI += item.income;
          }
        });
        setrevenues(sumMWI);
        setexpensMT(sumMWE);

        var savingM = sumMWI - sumMWE;
        setsaving(savingM);
        charData.push({
          income: sumMWI,
          saving: savingM,
          expense: sumMWE,
          month: month,
        });
      }
    }
    setchartBarData(charData);
  };
  
  const data = {
    labels: ["shooping", "grocery", "fuel", "medical", "bill", "other"],
    datasets: [
      {
        label: " of expenses",
        data: [shooping, grocery, fuel, medical, bill, other],
        backgroundColor: [
          "rgb(33, 150, 243, .9)", // Blue
          "rgb(255, 87, 34,  .9)", // Orange
          "rgb(76, 175, 20,  .9)", // Green
          "rgb(255, 193, 7,  .9)", // Yellow
          "rgb(227, 20, 110, .9)", //
          "rgb(156, 39, 176, .9)", // Purple
        ],
        borderColor: [
          "rgb(255,255,255,1)",
          "rgb(255,255,255,1)",
          "rgb(255,255,255,1)",
          "rgb(255,255,255,1)",
          "rgb(255,255,255,1)",
          "rgb(255,255,255,1)",
        ],
        borderWidth: 3,
      },
    ],
  };

  useEffect(() => {
    getExpenseList();
  }, []);
  //--------------------bar chart------------------------------
  const chartSetting = {
    yAxis: [
      {
        label: "",
      },
    ],
    width: 400,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const dataset = chartBarData;
  // console.log("dataset",dataset.length)



  const valueFormatter = (value) => `${value}/-`;
  const [settime, setsettime] = useState(false);
  setTimeout(() => {
    setsettime(true);
  }, 2000);

  return (
    <div>
     
      <input type="checkbox" id="menu-toggle" />

      <div className="main-content">
        <main>
          <div className="page-header">
            <h1>Dashboard</h1>
            <small>Home / Dashboard</small>
          </div>
          <div className="page-content">
            <div className="analytics">
              <div className="card">
                <div className="card-head">
                  <h2>
                    <font color="red">-</font>&#8377;{expensMT}
                  </h2>
                  <span className="las la-wallet" />
                </div>
                <div className="card-progress">
                  <small>Montly expenses</small>
                  <div className="card-indicator">
                    <div className="indicator two" style={{ width: "20%" }} />
                  </div>
                  <Button
                    component={Link}
                    to={`/add`}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mr: 3.5 }}
                  >
                    ADD EXPENSES
                  </Button>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h2>
                    <font color="green">+</font>&#8377;{revenues}
                  </h2>
                  <span className="las la-coins" />
                </div>
                <div className="card-progress">
                  <small>Monthly Revenue</small>
                  <div className="card-indicator">
                    <div className="indicator one" style={{ width: "60%" }} />
                  </div>

                  <Button
                    component={Link}
                    to={`/addrevenue/${localStorage.getItem("id")}`}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mr: 3.5, width: "45%" }}
                  >
                    ADD
                  </Button>
                  <Button
                    component={Link}
                    to={`/listrevenue/${localStorage.getItem("id")}`}
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, width: "45%" }}
                  >
                    SEE
                  </Button>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h2>&#8377;{goalTotal}</h2>
                  <span className="las la-bullseye" />
                </div>
                <div className="card-progress">
                  <small>Set goal to control expenditure</small>
                  <div className="card-indicator">
                    <div className="indicator three" style={{ width: "40%" }} />
                  </div>
                  <Button
                    component={Link}
                    to={`/goal`}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mr: 3.5, width: "45%" }}
                  >
                    SET GOAL
                  </Button>
                  <Button
                    component={Link}
                    to="/viewGoal"
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, width: "45%" }}
                  >
                    VIEW
                  </Button>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h2>&#8377;{saving}</h2>
                  <span className="las la-money-bill-wave-alt" />
                </div>
                <div className="card-progress">
                  <small>Monthly Saving</small>
                  <div className="card-indicator">
                    <div className="indicator four" style={{ width: "30%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="analyticss">
              <div className="card">
                <div className="card-head">
                  <h2>Category wise your expenditures</h2>
                </div>
                <div className="card-progress" style={{ height: "70vh" }}>
                  <Pie data={data} />
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h2>Monthly expenditure analytics</h2>
                </div>
             
                  
                <div className="card-progress" style={{ margin: "60px auto" }}>
                  {settime == true ? (
                    
                    <BarChart
                   
                    // dataset={[""]}
                      dataset= {dataset.length>0  ?    dataset :  [""] }
                      xAxis={[{ scaleType: "band", dataKey: "month" }]}
                      series={[
                        {
                          dataKey: "income",
                          label: "Income",
                          valueFormatter,
                          color: "#2aa0db",
                        },
                        {
                          dataKey: "saving",
                          label: "Saving",
                          valueFormatter,
                          color: "#22baa0",
                        },
                        {
                          dataKey: "expense",
                          label: "Expense",
                          valueFormatter,
                          color: "#e15759",
                        },
                      ]}
                      {...chartSetting}
                    />
                  ) : (
                    <CustomeLoader/>
                  )}
                </div>
              </div>
            </div>

            <div>
              <ListDashBoard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
