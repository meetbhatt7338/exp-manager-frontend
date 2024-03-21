import React from "react";
import "../assets/css/landing.css";
import hero from "../assets/img/hero.jpg";
import addexpense from "../assets/img/addexpense.png";
import goal from "../assets/img/goal.png";
import income from "../assets/img/income.png";
import list from "../assets/img/list.png";
import featureOne from '../assets/img/feature-1.png'
import featureTwo from '../assets/img/feature-2.png'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const LandingPage = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Expense Management Made Easy
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Expense Manager is a web-based application designed to help
              individuals and businesses efficiently track their expenses. It
              provides users with a convenient platform to record, categorize,
              and analyze their spending, enabling them to gain better insights
              into their financial habits and make informed decisions. .
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, width: "45%" }}
                  >
                    Get Started
                  </Button>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={hero} alt="hero image" />
          </div>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="3"
              ></li>
            </ol>
            <div
              class="carousel-inner"
              data-interval="1000"
              style={{ backgroundColor: "black" }}
            >
              <div class="carousel-item active">
                <img
                  style={{ opacity: "0.5" }}
                  class="d-block w-100"
                  src={addexpense}
                  alt="First slide"
                ></img>
                <div class="carousel-caption d-none d-md-block">
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "30px",
                      color: "white",
                    }}
                  >
                    Add Expense
                  </h3>
                  <p>
                    This feature streamlines the process of recording new
                    expenses, ensuring that users can maintain accurate and
                    up-to-date records of their spending habits within the
                    Expense Manager.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  style={{ opacity: "0.5" }}
                  src={goal}
                  alt="Second slide"
                ></img>
                <div class="carousel-caption d-none d-md-block">
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "30px",
                      color: "white",
                    }}
                  >
                    Set Goal
                  </h3>
                  <p>
                    You can take control of your financial journey, track your
                    progress towards your aspirations, and ultimately realize
                    your financial objectives.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100"   style={{ opacity: "0.5" }} src={income} alt="Third slide"></img>
                <div class="carousel-caption d-none d-md-block">
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "30px",
                      color: "white",
                    }}
                  >
                    Set Income
                  </h3>
                  <p>
                    You can set revenue to track income inflows, analysis of savings and maintain better control over their finances within the Expense Manager.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100"   style={{ opacity: "0.5" }} src={list} alt="Fourth slide"></img>
                <div class="carousel-caption d-none d-md-block">
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "30px",
                      color: "white",
                    }}
                  >
                    List of Transactions
                  </h3>
                  <p>
                    You  can gain valuable insights into their financial activities, track expenses, update expenses, monitor cash flow,Generate reports and visualize spending patterns and make informed decisions to achieve their financial goals.
                  </p>
                </div>
              </div>


            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6 dark:text-gray-400"></div>

      {/* End block */}
      {/* Start block */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          {/* Row */}
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Gain Insight into Your Spending Habits
              </h2>
              <p className="mb-8 font-light lg:text-xl">
              Understanding where your money goes is essential for effective financial management. With our Expense Manager's Category-wise Expenditure Pie Chart feature, you can gain valuable insights into your spending patterns and make informed decisions to achieve your financial goals.
              </p>
              {/* List */}
              <ul
                role="list"
                className="pt-6 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
              >
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Identify trends and patterns in your spending habits
                  </span>
                </li>
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Track your progress towards budget goals
                  </span>
                </li>
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Taking control of your finances
                  </span>
                </li>
              </ul>
              <p className="mb-8 font-light lg:text-xl">
              Explore interactive features such as hover-over tooltips to view specific category details  for deeper analysis.
              </p>
            </div>
            <img
              className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src={featureOne}
              alt="dashboard feature image"
            />
          </div>
          {/* Row */}
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src={featureTwo}
              alt="feature image 2"
            />
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Track Your Monthly Financial Progress with  Bar Chart
              </h2>
              <p className="mb-8 font-light lg:text-xl">
              Achieving financial stability requires diligent tracking of your income, expenses, and savings. Our Expense Manager's Monthly Saving, Expense, and Revenue Bar Chart empowers you to monitor your financial progress effectively and make informed decisions to reach your financial goals.
              </p>
              {/* List */}
              <ul
                role="list"
                className="pt-6 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
              >
               
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Easily compare your monthly savings, expenses, and revenue over time to identify trends, track fluctuations.
                  </span>
                </li>
                <li className="flex space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Budget Alignment
                  </span>
                </li>
              </ul>
              <p className="font-light lg:text-xl">
              Start visualizing your financial journey today and embark on the path to a brighter financial future.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      <section className="bg-white dark:bg-gray-900">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <p className="text-lg font-medium text-purple-600 dark:text-purple-500">
              Trusted Worldwide
            </p>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Trusted by over 1 million users and 10,000 teams
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Our rigorous security and compliance standards are at the heart of
              all we do. 
            </p>
           
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                99.99% uptime
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                With zero maintenance downtime
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                1M+ Users
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Trusted by over 1 milion users around the world
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                2+ countries
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Have used  to create functional websites
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                2+ Million
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Add Transactions per day
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                "Control your expenses today, so you can enjoy your financial freedom tomorrow."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  Micheal Gough
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  CEO at Google
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      {/* End block */}
      {/* Start block */}
      {/* End block */}
    </>
  );
};
