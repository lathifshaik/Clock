import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import moment from 'moment';

// Define the light and dark themes
const LightTheme = createGlobalStyle`
  body {
    background-color: white;
    color: black;
  }
`;

const DarkTheme = createGlobalStyle`
  body {
    background-color: black;
    color: red;
  }
`;

const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Clock = styled.h1`
  font-size: 10em;
  margin-bottom: 0;
`;

const Calendar = styled.h2`
  font-size: 6em;
  margin-top: 0;
`;



function App() {
  // Set the state for the current time, date, theme, and alarm
  const [time, setTime] = useState(moment().format('hh:mm:ss A'));
  const [date, setDate] = useState(moment().format('LL'));
  const [theme, setTheme] = useState('light');
  const [alarm, setAlarm] = useState('');

  // Update the time and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('hh:mm:ss A'));
      setDate(moment().format('LL'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update the theme based on the time
  useEffect(() => {
    const currentHour = moment().hour();
    if (currentHour >= 6 && currentHour < 18) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [time]);

  // Check if the alarm should be triggered
  useEffect(() => {
    if (moment().format('hh:mm A') === alarm) {
      alert('Alarm!');
      setAlarm('');  // Reset the alarm
    }
  }, [time, alarm]);

  return (
    <ClockContainer>
      {theme === 'light' ? <LightTheme /> : <DarkTheme />}
      <Clock>{time}</Clock>
      <Calendar>{date}</Calendar>
      
    </ClockContainer>
  );
}

export default App;
