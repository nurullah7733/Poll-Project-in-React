import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const PollList = (props) => {
  if (props.poll.length === 0) {
    return <h1>There is No Poll</h1>;
  }

  return (
    <ListGroup>
      {props.poll.map((pollItem) => (
        <ListGroupItem
          style={{ cursor: "pointer" }}
          onClick={() => props.selectePoll(pollItem.id)}
          key={pollItem.id}
        >
          {pollItem.title.length > 30
            ? pollItem.title.substr(0, 40) + "..."
            : pollItem.title}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default PollList;
