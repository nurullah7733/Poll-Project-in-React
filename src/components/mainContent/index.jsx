import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PerticipateForm from "./perticipateForm";
import PollForm from "../pollForm";

class MainContent extends React.Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    if (Object.keys(this.props.poll).length === 0) {
      return (
        <div>
          <h3>Welcome to My Application</h3>
          <p>
            You can create as many poll as you want. Click the new button to
            create a new poll. To check details of a poll please select from the
            left sidebar. By selecting a poll you can check its details.
            Participate and check others opinion about this poll.
          </p>
        </div>
      );
    }
    const { poll, getOpinion, updatePoll, deletePoll, result } = this.props;

    return (
      <div>
        <h3>{poll.title}</h3>
        <p>{poll.description}</p>
        <br />
        <PerticipateForm
          poll={poll}
          getOpinion={getOpinion}
          updatePoll={updatePoll}
          deletePoll={deletePoll}
          toggleModal={this.toggleModal}
        />
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>Update Poll</ModalHeader>
          <ModalBody>
            <PollForm
              poll={poll}
              submit={updatePoll}
              isUpdate={true}
              buttonValue="Update Poll"
            />
          </ModalBody>
        </Modal>
        <div>
          {result.map((poll) =>
            poll.opinions.map((p) => (
              <div key={p.id}>
                <strong style={{ color: "red" }}>{p.name}</strong> <br />
                <strong>{p.value}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default MainContent;
