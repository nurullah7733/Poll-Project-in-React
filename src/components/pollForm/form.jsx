import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Button,
  Label,
  Input,
} from "reactstrap";

const MyForm = ({
  title,
  description,
  options,
  errors,
  handleSubmit,
  handleChange,
  handleOptionChange,
  deleteOption,
  buttonValue,
  createOption,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          placeholder="Title"
          value={title}
          name="title"
          id="title"
          onChange={handleChange}
          invalid={errors.title ? true : false}
        />
        {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          placeholder="Describe Your Polls."
          value={description}
          name="description"
          id="description"
          onChange={handleChange}
          invalid={errors.description ? true : false}
        />
        {errors.description && (
          <FormFeedback>{errors.description}</FormFeedback>
        )}
      </FormGroup>

      <FormGroup>
        <Label>
          Enter Options{" "}
          <span
            style={{
              marginLeft: "30px",
              background: "green",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => createOption()}
          >
            Add Option
          </span>
        </Label>
        {options.map((opt, index) => (
          <div key={opt.id} className="d-flex my-2">
            <Input
              value={opt.value}
              onChange={(e) => handleOptionChange(e, index)}
              invalid={errors.options && errors.options[index] ? true : false}
            />
            <Button
              color="danger"
              disabled={options.length <= 2}
              onClick={() => deleteOption(index)}
              style={{ marginLeft: "6px" }}
            >
              delete
            </Button>
          </div>
        ))}
      </FormGroup>
      <Button type="submit" color="primary">
        {buttonValue}
      </Button>
    </Form>
  );
};

export default MyForm;
