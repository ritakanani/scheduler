import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/style.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

/////*********************** Appointment Component************************//////

function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);    
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  // for onConfirm Confirm component
  function handleDelete(id) {
    transition(DELETE);
    props.cancelInterview(id).then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
  // for onEdit Show component
  function onEdit() {
    transition(EDIT);    
  }
  // for onDelete Show component
  function onDelete() {
    transition(CONFIRM);
  }

  return (

    <article className="appointment">
      {props.time && <Header time={props.time} />}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} onDelete={props.onDelete} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save} 
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save} 
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure would you like to delete?"}
          onCancel={back}
          onConfirm={() => handleDelete(props.id)}
        />
      )}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={back} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={back} />}
    </article>

  );
}

export default Appointment;
