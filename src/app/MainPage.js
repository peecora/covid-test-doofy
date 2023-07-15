'use client';
import React, { useState, useEffect } from 'react';
import { FloatingButton } from './misc/FloatingButton';

import axios from 'axios';

axios.defaults.headers['X-RapidAPI-KEY'] =
  'fbba93b5bdmsh1a501d0b0144829p1bf638jsnf241b6a477d6';
const baseURL = 'https://covid-193.p.rapidapi.com/statistics';

const MainPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [darkMode]);
  var listItems;
  var casesTotal = 0;
  if (!loading && !error) {
    console.log(data);
    casesTotal = data?.response
      ?.map((value) => value.cases.active)
      .reduce((acc, amount) => acc + amount);
    listItems = data?.response?.map((value) => (
      <li className='container text-base m-4 '>
        <span className='text-[#17a2b8]'>{value.cases.active * 10000} </span>
        in {value.country}
      </li>
    ));
  }
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }
  if (loading) {
    return (
      <main
        className={`flex items-center justify-center p-4 h-screen w-screen${
          darkMode ? 'dark' : 'light'
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='50'
          height='50'
          className='animate-spin fill-neutral-100'
          viewBox='0 0 50 50'>
          <path d='M4.262 18.324l-1.42 1.42c-1.77-2.09-2.842-4.79-2.842-7.744s1.072-5.654 2.841-7.745l1.42 1.42c-1.411 1.725-2.261 3.928-2.261 6.325s.85 4.6 2.262 6.324zm17.738-6.324c0 2.397-.85 4.6-2.262 6.324l1.42 1.42c1.77-2.09 2.842-4.79 2.842-7.744s-1.072-5.654-2.842-7.745l-1.42 1.42c1.412 1.725 2.262 3.928 2.262 6.325zm-16.324-7.738c1.724-1.412 3.927-2.262 6.324-2.262s4.6.85 6.324 2.262l1.42-1.42c-2.091-1.77-4.791-2.842-7.744-2.842-2.954 0-5.654 1.072-7.744 2.842l1.42 1.42zm12.648 15.476c-1.724 1.412-3.927 2.262-6.324 2.262s-4.6-.85-6.324-2.262l-1.42 1.42c2.09 1.77 4.79 2.842 7.744 2.842 2.953 0 5.653-1.072 7.744-2.842l-1.42-1.42z' />
        </svg>
      </main>
    );
  } else if (error) {
    return (
      <main
        className={`flex items-center justify-center p-4 h-screen w-screen ${
          darkMode ? 'dark' : 'light'
        }`}>
        <div className='text-3xl text-red-900'>Error Fetching Data</div>
      </main>
    );
  } else {
    return (
      <main
        className={`grid h-screen grid-cols-7 grid-rows-2 gap-4 p-4 ${
          darkMode ? 'dark' : 'light'
        }`}>
        <FloatingButton toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
        <div className='col-span-2 row-span-2 row-start-1 items-center font-mono container'>
          <div className='p-4 text-[#17a2b8] text-xl h-50 items-center flex justify-center'>
            {casesTotal}
          </div>
          <div className='overflow-auto h-full'>
            <ul>{listItems}</ul>
          </div>
        </div>
        <div className='col-span-5 row-start-1 container'>02</div>
        <div className='col-span-5 row-start-2 container'>03</div>
      </main>
    );
  }
};

export default MainPage;
