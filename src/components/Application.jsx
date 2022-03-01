import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  // combined state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // // combined state working with object
  // const state = { day: "Monday", days: [] };
  // setState({ ...state, day: "Tuesday" });
  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Call the props.cancleInterview function with the appointment id and interview as arguments from within the handleDelete function.
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
    });
  };

  // Call the props.bookInterview function with the appointment id and interview as arguments from within the save function. Verify that the correct id and interview values are correct in the console output.
  const bookInterview = (id, interview) => {
    // console.log({id, interview});
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments });
    });
  };

  
  const [dailyAppointments, setDailtAppointments] = useState([]);
  useEffect(() => {
    setDailtAppointments(getAppointmentsForDay(state, state.day));
  }, [state]);

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const appointment = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            // day={"Monday"}
            value={state.day}
            // setDay={(day) => console.log(day)}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointment}
        <Appointment key={"last"} time={"5pm"} />
      </section>
    </main>
  );
}
