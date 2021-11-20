import React from "react";
import shortid from "shortid";
import { Container, Row, Col } from "reactstrap";
import MainContent from "./components/mainContent";
import Sidebar from "./components/sidebar";

import Polls from "./data/poll";

class App extends React.Component {
  state = {
    poll: [],
    selectedPoll: {},
    searchTerm: "",
  };

  componentDidMount() {
    this.setState({ poll: Polls });
  }

  addNewPoll = (poll) => {
    poll.id = shortid.generate();
    poll.created = new Date();
    poll.totalVote = 0;
    poll.opinions = [];

    this.setState({ poll: this.state.poll.concat(poll) });
  };

  updatePoll = (updatedPoll) => {
    const poll = [...this.state.poll];
    const rightPoll = poll.find((p) => p.id === updatedPoll.id);

    rightPoll.title = updatedPoll.title;
    rightPoll.description = updatedPoll.description;
    rightPoll.options = updatedPoll.options;

    this.setState({ poll });
  };

  deletePoll = (pollId) => {
    const poll = this.state.poll.filter((p) => p.id !== pollId);
    this.setState({ poll, selectedPoll: {} });
  };

  selectePoll = (pollId) => {
    const poll = this.state.poll.find((p) => p.id === pollId);
    this.setState({
      selectedPoll: poll,
    });
  };

  getOpinion = (response) => {
    const { poll } = this.state;
    const singlePoll = poll.find((p) => p.id === response.pollId);
    const option = singlePoll.options.find(
      (o) => o.id === response.selectedOption
    );

    singlePoll.totalVote++;
    option.vote++;
    const opinion = {
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption,
      value: option.value,
    };
    singlePoll.opinions.push(opinion);
    this.setState({ poll });
  };

  handleSearch = (value) => {
    this.setState({ searchTerm: value });
  };

  performSearch = () => {
    return this.state.poll.filter((p) =>
      p.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  render() {
    const poll = this.performSearch();

    return (
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col md={4}>
            <Sidebar
              poll={poll}
              selectePoll={this.selectePoll}
              addNewPoll={this.addNewPoll}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
            />
          </Col>
          <Col md={8}>
            <MainContent
              poll={this.state.selectedPoll}
              result={this.state.poll}
              getOpinion={this.getOpinion}
              updatePoll={this.updatePoll}
              deletePoll={this.deletePoll}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
