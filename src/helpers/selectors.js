// import Appointment from "components/Appointment";

export const getAppointmentsForDay = (state, day) => {
  if (state.days.length === 0) {
    return [];
  }

  const filteredNames = state.days.filter(stateDay => stateDay.name === day     
  ).map((filterItem) => filterItem.appointments )

  if(filteredNames.length === 0) {
    return [];
  }
  const appointments = filteredNames[0].map((appointmentId) => state.appointments[appointmentId])  
  return appointments;
}



export const getInterview = (state, interview) => {

  if (!interview) {
    return null;
  }

  const interviewers = state.interviewers;
  const interviewerId = interview.interviewer

  const interviewer = interviewers[interviewerId]
  const result = {
    student: interview.student,
    interviewer: interviewer
  };  
  
  return result;
}
