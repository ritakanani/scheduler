import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";



export default function DayListItem (props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0, 
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots";
    } else if (spots === 1) {
      return "1 spot";
    } else {
      return `${spots} spots`;
    }
  }

  return (
    <li onClick={() => props.setDay(props.name)} selected={props.selected} className={dayClass}  data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
