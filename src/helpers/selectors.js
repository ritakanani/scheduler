export const getAppointmentsForDay = (state, day) => {
  const filteredNames = state.days.filter(stateDay => stateDay.name === day);
  // console.log("stateday", filteredNames);
  
  return filteredNames;
}
