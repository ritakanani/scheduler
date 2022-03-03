import React from "react";
import classnames from "classnames";

import "components/Button.scss";

export default function Button(props) {

   // These if statement is written by classnames library to create a buttonClass string.
   // classnames library is already installed in node_modules folder 

   let buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (      
         <button type="submit" onClick={props.onClick} disabled={props.disabled} className={buttonClass}>{props.children}</button>      
   );
}
 