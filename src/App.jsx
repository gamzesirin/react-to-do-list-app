import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs'
import { Button, Form, FormControl } from 'react-bootstrap'

import { FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
	const [todo, setTodo] = useState('')
	const [newTodo, setNewTodo] = useState('')
	const [todoList, setTodoList] = useState([])

	const addTodo = () => {
		setTodoList((prevTodoList) => [
			...prevTodoList,
			{ id: uuidv4(), todo: newTodo, isEdittable: false, isCompleted: false }
		])
		setNewTodo('')
	}

	const completeTodo = (id) => {
		setTodoList((prevTodoList) =>
			prevTodoList.map((todoItem) =>
				todoItem.id === id ? { ...todoItem, isCompleted: !todoItem.isCompleted } : todoItem
			)
		)
	}

	const editTodo = (id, oldtodo) => {
		setTodoList((prevTodoList) =>
			prevTodoList.map((todoItem) =>
				todoItem.id === id ? { ...todoItem, isEdittable: !todoItem.isEdittable, todo: oldtodo } : todoItem
			)
		)
		setTodo(oldtodo)
	}

	const saveTodo = (id) => {
		setTodoList((prevTodoList) =>
			prevTodoList.map((todoItem) =>
				todoItem.id === id ? { ...todoItem, isEdittable: !todoItem.isEdittable, todo: todo } : todoItem
			)
		)
	}
	const deleteTodo = (id) => {
		setTodoList((prevTodoList) => prevTodoList.filter((todoItem) => todoItem.id !== id))
	}

	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-5">
			<h1 className="mt-5 me-5">Todo List</h1>
			<div className="d-flex w-50 mt-3">
				<FormControl
					className="w-75"
					placeholder="Todo input"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<Button className="ms-3" onClick={() => addTodo()}>
					Add todo
				</Button>
			</div>
			<div className="mt-5 w-75">
				{todoList.map((todoItem) => (
					<div key={todoItem.id} className="d-flex justify-content-between mt-2">
						<div className="d-flex w-75">
							<Form.Check
								type="checkbox"
								className="me-2"
								value={todoItem.isCompleted}
								onChange={() => completeTodo(todoItem.id)}
							/>
							{!todoItem.isEdittable ? (
								<label className={`${todoItem.isCompleted ? 'text-decoration-line-through' : ''}`}>
									{todoItem.todo}
								</label>
							) : (
								<input className="w-75" value={todo} onChange={(e) => setTodo(e.target.value)} />
							)}
						</div>
						<div>
							{!todoItem.isEdittable ? (
								<BsPencilSquare
									style={{ cursor: 'pointer' }}
									className="me-2"
									onClick={() => editTodo(todoItem.id, todoItem.todo)}
								/>
							) : (
								<FaCheck style={{ cursor: 'pointer' }} className="me-2" onClick={() => saveTodo(todoItem.id)} />
							)}

							<BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => deleteTodo(todoItem.id)} />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default App
