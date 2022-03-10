// We are going to create a function called getAppointmentsForDay that will receive two arguments state and day. The function will return an array of appointments for the given day.
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


// This function will return an object that contains the interview data if it is passed an object that contains an interviewer
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

// Same as getAppointmentsForDay function, but returning interviewers instead. 
export const getInterviewersForDay = (state, day) => {
  if (state.days.length === 0) {
    return [];
  }

  const filteredNames = state.days.filter(stateDay => stateDay.name === day     
  ).map((filterItem) => filterItem.interviewers )

  if(filteredNames.length === 0) {
    return [];
  }
  const interviewers = filteredNames[0].map((interviewerId) => state.interviewers[interviewerId])  
  return interviewers;
}


