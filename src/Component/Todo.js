import React from 'react'
import styles from './Todo.module.css'
import Item from './Item'
import { useState } from 'react';

const Todo = () => {
  const [input, setInput] = useState()
  const [tasks, settasks] =useState(

    localStorage.getItem('tasks') ?
    JSON.parse(localStorage.getItem ('tasks'))
    : []
  )

  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState ('')
    


  //Event handlers
  const addtask = (e) => {
    e.preventDefault();

    //if input is empty
    if (input === ''){
      alert ('Please enter a task')
    }

    //if i am editing the task
    if (isEdit){
      const updatedList = tasks.map((task) => {
        if (task.id === editId) task.name = input
        return task
      })
      setEdit(false)
      setEditId('')
      settasks(updatedList)
      return
    }

    //Creating a new task
    const newTask = {
      id: new Date().getTime().toString(),
      name: input,
      status: 'pending',
    }
    settasks([...tasks, newTask])
    setInput('')

    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  //Edit task handler
  const editTask = (id) => {
    const task = tasks.find((task) => task.id === id)
    setInput(task.name)
    setEdit(true)
    setEditId(task.id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  //Done handler
  const makeDone = (id) => {
    const updatedList = tasks.map((task) => {
      if (task.id === id) task.status = 'done'
      return task
    })

    settasks(updatedList)
    localStorage.setItem('tasks', JSON.stringify(updatedList))
  }

  //Delete handler
  const deleteTask = (id) => {
    const updatedList = tasks.filter((task) => task.id !== id)

    settasks(updatedList)
    console.log(tasks)

    localStorage.setItem('tasks', JSON.stringify(updatedList))
  }

  //Clear all
  const clearAll = () => {
    settasks([])
  }



  
  return (
    <div className={styles.card}>
        <h1>Make your own TO-DO-LIST 🧾</h1>
      <p>Add your task here 🖋....</p>

    <form>
      <input type='text' 
      placeholder='Your task' 
      value={input}
      onChange={(e) => {
        setInput(e.target.value)
      }}
    />

      <button type='submit'
      onClick={addtask}>Submit</button>
      
    </form>

  <div>
      <h4>Your Task</h4> 

    {/* Task list */}
     {tasks.map((task) =>{
      return ( <Item  
      task = {task} 
      markTask={makeDone}
      deleteTask={deleteTask}
      editTask={editTask}
      />
      )
     })}
     
     </div>
    <div>
      <button className={styles.clearall}  onClick={clearAll} >Clear all</button>
    </div>

  </div>
    
  )
}

export default Todo