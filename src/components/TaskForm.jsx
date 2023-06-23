import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../features/tasks/taskSlice'
import { useNavigate, useParams } from 'react-router-dom'

function TaskForm() {
  const params = useParams()
  const navigate = useNavigate()
  const taskState = useSelector(state => state.tasks)
  const dispatch = useDispatch()
  const titleTask = useRef()
  const descriptionTask = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const taskToSubmit = {
      title: titleTask.current.value,
      description: descriptionTask.current.value
    }
    if(params.id){
      const id = params.id
      dispatch(editTask({...taskToSubmit, id}))
    }else{
      dispatch(addTask(taskToSubmit))
    }
    navigate("/")
  }

  useEffect(()=>{
    if(params.id){
      const currentTask = taskState.find((task) => task.id === params.id)
      titleTask.current.value = currentTask.title
      descriptionTask.current.value = currentTask.description
    }
  },[params.id, taskState])

  return (
    <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sm p-4 rounded-md'>
      <label htmlFor="title" className='block text-sm font-bold mb-1'>Task:</label>
      <input name='title' type="text" placeholder="Title" ref={titleTask} className='w-full p-2 rounded-md bg-zinc-600 mb-2'/>
      <label htmlFor="description" className='block text-sm font-bold mb-1'>Description</label>
      <textarea name="description" placeholder="Description" ref={descriptionTask} className='w-full p-2 rounded-md bg-zinc-600 mb-2'></textarea>
      <button className='bg-indigo-600 px-2 py-1 rounded-md'>Save</button>
    </form>
  )
}

export default TaskForm