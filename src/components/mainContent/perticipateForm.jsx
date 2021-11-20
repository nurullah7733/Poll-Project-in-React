import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Button,
} from "reactstrap";

class PerticipateForm extends React.Component {
  state = {
    name: "",
    selectedOption: "",
    errors: {},
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = this.validate();
    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.poll.id,
        name: this.state.name,
        selectedOption: this.state.selectedOption,
      });
      e.target.reset();
      this.setState({
        name: "",
        selectedOption: "",
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};

    if (!this.state.name) {
      errors.name = "Pls Provide a name";
    }
    if (!this.state.selectedOption) {
      errors.selectedOption = "Pls Select a Option";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <h4>Options</h4>
          <div style={{ marginLeft: "auto" }}>
            <Button
              color="warning"
              type="button"
              onClick={this.props.toggleModal}
            >
              Edit
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              type="button"
              color="danger"
              onClick={() => this.props.deletePoll(this.props.poll.id)}
            >
              delete
            </Button>
          </div>
        </div>
        {this.props.poll.options.map((opt) => (
          <FormGroup className="my-2" key={opt.id}>
            <div className="d-flex" htmlFor={opt.id}>
              <Input
                type="radio"
                id={opt.id}
                name="selectedOption"
                value={opt.id}
                onChange={this.handleChange}
                invalid={this.state.errors.selectedOption ? true : false}
                style={{ marginRight: "5px" }}
              />

              <Label>{opt.value}</Label>

              <span
                style={{
                  padding: "5px 20px",
                  background: "green",
                  color: "white",
                  borderRadius: "5px",
                  marginLeft: "auto",
                }}
              >
                {opt.vote}
              </span>
              <span
                style={{
                  padding: "5px 20px",
                  background: "orange",
                  color: "white",
                  borderRadius: "5px",
                  marginLeft: "5px",
                }}
              >
                {this.props.poll.totalVote > 0
                  ? ((100 * opt.vote) / this.props.poll.totalVote).toFixed(2)
                  : 0}
                %
              </span>
            </div>
          </FormGroup>
        ))}
        <FormGroup className="my-3">
          <Label>Enter Your Name</Label>
          <Input
            name="name"
            placeholder="Md Nurullah"
            value={this.state.name}
            onChange={this.handleChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}
        </FormGroup>

        <Button color="primary" type="submit">
          Submit Your Opinion
        </Button>
        {<div style={{ marginTop: "20px" }}> {} </div>}
      </Form>
    );
  }
}

export default PerticipateForm;
