import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { format } from "date-fns";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getDevs, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const devs = ref.current;
      devs.name.value = onEdit.name;
      devs.gender.value = onEdit.gender;
      devs.birthday.value = format(new Date(onEdit.birthday), 'yyyy-MM-dd');
      devs.hobby.value = onEdit.hobby;
      devs.position.value = onEdit.position.id;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const devs = ref.current;

    if (
      !devs.name.value ||
      !devs.gender.value ||
      !devs.birthday.value ||
      !devs.hobby.value ||
      !devs.position.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .patch(`http://localhost:8080/developer/${onEdit.id}`, {
          name: devs.name.value,
          gender: devs.gender.value,
          birthday: devs.birthday.value,
          hobby: devs.hobby.value,
          position: devs.position.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8080/developer", {
          name: devs.name.value,
          gender: devs.gender.value,
          birthday: devs.birthday.value,
          hobby: devs.hobby.value,
          position: devs.position.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    devs.name.value = ""
    devs.gender.value = ""
    devs.birthday.value = ""
    devs.hobby.value = ""
    devs.position.value = ""

    setOnEdit(null);
    getDevs();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nível</Label>
        <Input name="position" />
      </InputArea>
      <InputArea>
        <Label>Name</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Gender</Label>
        <Input name="gender" type="gender" />
      </InputArea>
      <InputArea>
        <Label>Birthday</Label>
        <Input name="birthday" type="date" />
      </InputArea>
      <InputArea>
        <Label>Hobby</Label>
        <Input name="hobby" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
