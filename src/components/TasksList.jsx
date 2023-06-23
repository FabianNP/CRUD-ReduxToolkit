import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import { Link } from 'react-router-dom'

function TasksList() {
  const dispatch = useDispatch()
  const tasksState = useSelector(state => state.tasks)

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteTask(id))
  }

  return (
    <div className='w-4/6'>
      <header className='flex justify-between items-center py-4'>
        <h1>Tasks {tasksState.length}</h1>
        <Link to="/create-task" className='bg-indigo-600 px-3 py-2 rounded-sm text-sm'>Create Task</Link>
      </header>
      <div className='grid grid-cols-3 gap-3'>
        {tasksState.map((task) => (
          <div key={task.id} className='bg-neutral-800 p-4 rounded-md'>
            <header className='flex justify-between'>
              <h3>{task.title}</h3>
              <div className='flex gap-2'>
                <Link to={`/edit-task/${task.id}`} className='bg-zinc-600 px-2 py-1 text-xs rounded-md'>Edit</Link>
                <button onClick={() => handleDelete(task.id)} className='bg-red-500 px-2 py-1 text-xs rounded-md'>Delete</button>
              </div>
            </header>
            <p>{task.description}</p>
          </div> 
        ))}
      </div>
    </div>
  )
}

export default TasksList