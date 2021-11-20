import React from "react";
import shortid from "shortid";
import MyForm from "./form";

const defaultOptions = [
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
];

class PollForm extends React.Component {
  state = {
    title: "",
    description: "",
    options: defaultOptions,
    errors: {},
  };

  componentDidMount() {
    const { poll } = this.props;
    if (poll && Object.keys(poll).length > 0) {
      this.setState({
        title: poll.title,
        description: poll.description,
        options: poll.options,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOptionChange = (e, index) => {
    const { options } = this.state;
    options[index].value = e.target.value;
    this.setState({ options });
  };

  createOption = () => {
    const { options } = this.state;
    if (options.length < 5) {
      options.push({
        id: shortid.generate(),
        value: "",
        vote: 0,
      });
      this.setState({ options });
    } else {
      alert("You can create max 5 options");
    }
  };

  deleteOption = (index) => {
    const { options } = this.state;
    if (options.length > 2) {
      options.splice(index, 1);
      this.setState({ options });
    } else {
      alert("You must have at less two options");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = this.validate();

    if (isValid) {
      const { title, description, options } = this.state;
      const poll = {
        title,
        description,
        options,
      };
      if (this.props.isUpdate) {
        poll.id = this.props.poll.id;
        this.props.submit(poll);
        alert("Update successfull.");
      } else {
        this.props.submit(poll);
        e.target.reset();
        this.setState({
          title: "",
          description: "",
          options: defaultOptions,
          errors: {},
        });
      }
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};
    const { title, description, options } = this.state;

    if (!title) {
      errors.title = "Title is Empty";
    } else if (title.length < 20) {
      errors.title = "Title Too short";
    } else if (title.length > 100) {
      errors.title = "Title Too long";
    }

    if (!description) {
      errors.description = "Description is Empty";
    } else if (description.length > 500) {
      errors.description = "Description Too long";
    }

    const optionErrors = [];
    options.forEach((opt, index) => {
      if (!opt.value) {
        optionErrors[index] = "Option Text Empty";
      } else if (opt.value.length > 100) {
        optionErrors[index] = "Option Text Too Long";
      }
    });

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    const { title, description, options, errors } = this.state;

    return (
      <div>
        <MyForm
          title={title}
          description={description}
          options={options}
          errors={errors}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleOptionChange={this.handleOptionChange}
          deleteOption={this.deleteOption}
          createOption={this.createOption}
          buttonValue={this.props.buttonValue || "Create Poll"}
        />
      </div>
    );
  }
}

export default PollForm;
