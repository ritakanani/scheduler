export const getAppointmentsForDay = (state, day) => {
  if (state.days.length === 0) {
    return [];
  }

  const filteredNames = state.days.filter(stateDay =>     stateDay.name === day     
  ).map((filterItem) => filterItem.appointments )

  if(filteredNames.length === 0) {
    return [];
  }
  const appointments = filteredNames[0].map((appointmentId) => state.appointments[appointmentId])  
  return appointments;
}
