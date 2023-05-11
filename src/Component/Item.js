import React from 'react'
import styles from './Item.module.css'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {MdDone} from 'react-icons/md'


const Item = (props) => {
  const { task } = props
  return (
      <li  key={task.id}>
        { task.status === 'done'? <del>{task.name}</del> : <p>{task.name}</p> }
      <div>
          <button className={styles.done}
           onClick={() => {
            props.markTask(task.id)
          }}>

            <MdDone /></button>

          <button className={styles.edit}
           onClick={() => {
            props.editTask(task.id)
          }} >

            <FaEdit /></button>

          <button className={styles.delete}
          onClick={() => {
            props.deleteTask(task.id)
          }}>

            < FaTrash /></button>
            
      </div>

      </li>
    
  )
}

export default Item