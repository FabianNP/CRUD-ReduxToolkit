import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const taskId = uuid()
const initialState = [
  {
    id: "1",
    title: "Tasks 1",
    description: "Task 1 descprition",
    completed: false
  },
  {
    id: "2",
    title: "Tasks 2",
    description: "Task 2 descprition",
    completed: false
  }
]

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: taskId,
        title: action.payload.title,
        description: action.payload.description,
        completed: false
      }
      state.push(newTask)
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => (task.id !== action.payload))
      return newState
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload
      const foundTask = state.find(task => task.id === id)
      if(foundTask){
        foundTask.title = title
        foundTask.description = description
      }
    }
  }
})

export const { addTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer