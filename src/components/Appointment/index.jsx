import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/style.scss";


function Appointment (props) {
  // console.log("props", props);

  return (
    <article className="appointment">
      {props.time && <Header time={props.time} />}
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} onDelete={props.onDelete} /> : <Empty />}
      
    </article>
  );
}

export default Appointment;