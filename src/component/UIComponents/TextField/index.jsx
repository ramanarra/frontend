import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import './textfield.scss'

type Props = {
    value: String,
    onChange: String,
    placeholder: String,
    label: String,
    labelPost: String,
    labelId: String,
    labelPostId: String,
    labelClass: String,
    labelPostClass: String,
    className: String,
    size: 'sm' | 'lg',
    type: "text" | "number" | "password",
    error: Boolean
}

const TextField = ({
  value,
  onChange,
  placeholder,
  label,
  labelPost,
  labelId,
  labelPostId,
  labelClass,
  labelPostClass,
  className,
  size,
  error,
  type = "text",
}: Props) => {
  const randId = `txt-label-pre-${Math.floor(Math.random() * 10)}`;
  const randIdPost = `txt-label-post-${Math.floor(Math.random() * 10)}`;
  const isError = error? ' is-invalid' : ''
  const inputProps = {
    placeholder,
    "aria-label": placeholder,
    value,
    onChange,
    type,
  };
  return (
    <InputGroup
      size={size}
      className={"txt-field-wrap" + (!!className ? ` ${className}` : "")}
    >
      {!!label && (
        <InputGroup.Prepend>
          <InputGroup.Text
            id={labelId ? labelId : randId}
            className={
              "text-label text-label-pre" + (!!labelClass ? ` ${labelClass}` : "")
            }
          >
            {label}
          </InputGroup.Text>
        </InputGroup.Prepend>
      )}
      <FormControl className="text-field" {...inputProps} />
      {!!labelPost && (
        <InputGroup.Append>
          <InputGroup.Text
            id={labelPostId ? labelPostId : randIdPost}
            className={
              "text-label text-label-post" + (!!labelPostClass ? ` ${labelPostClass}` : "")
            }
          >
            {labelPost}
          </InputGroup.Text>
        </InputGroup.Append>
      )}
    </InputGroup>
  );
};

export default TextField;
