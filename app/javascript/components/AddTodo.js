import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
// toast.configure()がV9から使えない
// yarn add react-toastify@8.2.0で対応できる
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiSend } from 'react-icons/fi'

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1E90FF;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: default;
  `}
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

toast.configure()

function AddTodo() {
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false
  }

  const [todo, setTodo] = useState(initialTodoState)

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value })
  }

  const notify = () => {
    toast.success('Todo successfully created!', {
      position: 'bottom-center',
      hideProgressBar: true
    })
  }

  // v5ではuseHistoryフックが利用できたが、v6からはuseNavigateを利用するようになっている
  // 参考記事
  // https://dev-k.hatenablog.com/entry/react-router-v6-vs-v5-dev-k#%E7%9B%B8%E5%AF%BE%E3%83%91%E3%82%B9%E3%81%A8%E3%83%AA%E3%83%B3%E3%82%AF
  const navigate = useNavigate();

  const saveTodo = () => {
    var data = {
      name: todo.name
    }

    axios.post('/api/v1/todos', data)
    .then(resp => {
      setTodo({
        id: resp.data.id,
        name: resp.data.name,
        is_completed: resp.data.is_completed
      })
      notify()
      console.log(props)
      navigate('/todos')
    })
    .catch(e => {
      console.log(e)
    })
  }
  return (
    <>
      <h1>New Todo</h1>
      <InputAndButton>
        <InputName
          type="text"
          required
          value={todo.name}
          name="name"
          onChange={handleInputChange}
        />
        <Button
          onClick={saveTodo}
          disabled={(!todo.name || /^\s*$/.test(todo.name))}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  )
}

export default AddTodo