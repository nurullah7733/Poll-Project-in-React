import React from "react";
import PollList from "./pollList";
import { Input, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import PollForm from "../pollForm";

class Sidebar extends React.Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log(this.state.isOpen);
  };

  render() {
    return (
      <div style={{ background: "#efefef", padding: "10px" }}>
        <div className="d-flex mb-4">
          <Input
            type="search"
            placeholder="Search"
            value={this.props.searchTerm}
            onChange={(e) => this.props.handleSearch(e.target.value)}
          />

          <Button
            type="button"
            color="primary"
            onClick={() => this.toggleModal()}
            style={{ marginLeft: "7px" }}
          >
            New
          </Button>
        </div>
        <h3>List of Poll</h3>
        <hr />
        <PollList poll={this.props.poll} selectePoll={this.props.selectePoll} />
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>Create a New Poll</ModalHeader>
          <ModalBody>
            <PollForm submit={this.props.addNewPoll} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
