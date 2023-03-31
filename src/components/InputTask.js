import { useState } from "react";
import {
  Select,
  Input,
  Button,
  Grid,
  Header as HeaderError,
  Icon,
} from "semantic-ui-react";
import styled from 'styled-components'
import { v4 as uuidv4 } from "uuid";

const options = [
  { key: "deporte", text: "Deporte", value: "deporte" },
  { key: "casa", text: "Casa", value: "casa" },
  { key: "oficina", text: "Oficina", value: "oficina" },
  { key: "otra", text: "Otra", value: "otra" },
];

function InputTask(props) {
  const [task, setTask] = useState({
    idTask: "",
    taskName: "",
    categoryTask: "",
  });
  const [error, setError] = useState(false);

  const onChangeTask = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const onChangeCategoryTask = (e, data) => {
    setTask({ ...task, [data.name]: data.value });
  };
  const { createTask } = props;
  const onSubmitTask = (e) => {
    // no recargar pagina
    e.preventDefault();

    // validación
    if (task.taskName.trim() === "" && task.categoryTask.trim() === "") {
      setError(true);
      return;
    }
    // eliminar el mensaje previo
    setError(false);

    // setear un id
    task.idTask = uuidv4();
    // crear tarea
    createTask(task);
    // limpiar inputs
    setTask({
      idTask: "",
      taskName: "",
      categoryTask: "",
    });
  };

  return (
    <>
      <form onSubmit={onSubmitTask}>
        <Grid centered columns={2}>
          <Input type="text" action className="content-grid">
            <Input
              size="small"
              icon="add"
              placeholder="Escribe tu tarea..."
              iconPosition="left"
              name="taskName"
              value={task.taskName}
              onChange={onChangeTask}
            />
            <Select
              compact
              options={options}
              className="select-form-task"
              name="categoryTask"
              placeholder="Categoria"
              value={task.categoryTask}
              onChange={onChangeCategoryTask}
            />
            <Button type="submit" color="violet" onClick={onSubmitTask}>
              Añadir tarea
            </Button>
          </Input>
        </Grid>
        {error && (
          <Grid centered>
            <HeaderError as="h4" color="red" className="alert-error-form">
              <Icon name="close" />
              <HeaderError.Content>La tarea es obligatoria</HeaderError.Content>
            </HeaderError>
          </Grid>
        )}
      </form>
    </>
  );
}

export default InputTask;
