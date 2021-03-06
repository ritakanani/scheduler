import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData () {
  // combined state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });  

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

  // spots remaining function
  const remainingSpots = (state, appointments) => {
    let result = [];

    for (let day of state.days) {
      let spots = 5;
      for(let appointment of day.appointments) {        
        if (appointments[appointment].interview) {
          spots -= 1;
        }        
      }   
      result.push({...day, spots});
    }
    return result;
  }

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
      setState({ ...state, appointments, days: remainingSpots(state, appointments) });      
    });
  };

  // Call the props.bookInterview function with the appointment id and interview as arguments from within the save function. Verify that the correct id and interview values are correct in the console output.
  const bookInterview = (id, interview) => {    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days: remainingSpots(state, appointments) });
    });
  };

  return {state, setDay, bookInterview, cancelInterview}
}