import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import InputTask from "./components/InputTask";
import TaskContent from "./components/TaskContent";

function App() {

  // pasar tareas al localstorage
  let initialTasks = JSON.parse(localStorage.getItem("tasks"))

  if(!initialTasks){
    initialTasks = [];
  }

  const [tasks, setTasks] = useState(initialTasks);
  useEffect(() => {
    if(initialTasks){
      localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, [initialTasks, tasks]);
  
  const createTask = (task) => {
    setTasks([...tasks, task]);
  }
  const deleteTask = (id) => {
    const currentTask = tasks.filter((task) => task.idTask !== id)
    setTasks(currentTask)
  }

  return (
    <Container>
      <Header />
      <InputTask createTask={createTask} />
      <TaskContent tasks={tasks} deleteTask={deleteTask} />
    </Container>
  )
}

export default App;
