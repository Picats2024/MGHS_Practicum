import React, { useEffect } from 'react';
import { useState } from 'react';
import LoadingScreen from '../components/modals/loadingScreen';
import TaskEditForm from '../components/taskEditForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const URL = "https://mghs-backend.onrender.com/task"

// fetch the tasks from the api 
async function fetchTasks(){

  const URL = "https://mghs-backend.onrender.com/task"

  let response = await fetch(URL, {method: "GET",credentials: "omit"})
  const payload = response.json()

  return payload

}

// this page is for the view of tasks and navigating to them
const TaskPage = () => {

  // set up stateful variables
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()

  // retrieve the tasks from the api
  useEffect(() => {

  
    async function getTasks(){    
      let data = await fetchTasks()
      setTasks(data)
    }

    getTasks()
  }, [])


  // present the loading screen if the tasks variable is empty
  if (!tasks){
    return(
      <LoadingScreen></LoadingScreen>
    )
  }
 
  // navigate to task detail page 
  // TODO: change the navigation to use a parameter-
  // instead of loading the currentTask data into it
  function HandleEditTask(CurrentTask){

    navigate('/task-detail/' + CurrentTask.id, {state: {CurrentTask}})
  
  }

  return (
    <main>
      <section>

        <h1>
          ALL TASKS
        </h1>

      </section>

      <TaskEditForm></TaskEditForm>

      <aside>


        {
          tasks.map((task, index) => {

            return(
            <section class="task-card" key={index}>

              <header>
                <h3>
                  Name: {task.name}
                </h3>
                <h4>
                  <strong>Team:</strong> <Link to={`/team-details/` + task.team_id}>{task.team_name}</Link>
                </h4>
              </header>

              <main>
                <strong><h3>Description</h3></strong>
                <p>
                  {task.description}
                </p>
              </main>

              <aside>
                <button onClick={() => {HandleEditTask(task)}}>
                  Edit Task
                </button>
              </aside>

            </section>)

          })
        }

      </aside>
    </main>
  );
};

export default TaskPage;
