import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { AppColors } from '../theme/styles/AppColors';
import * as ROUTES from '../constants/routes';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background-color: #fefefe;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  width: 430px;
  margin: 20px 0 30px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 400px;
  height: 45px;
  border-radius: 2px;
  border: 1px solid #d6d6d6;
  border-width: ${props => props.borderWidth};
  border-radius: ${props => props.borderRadius};
  padding: 4px 6px;
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
`;

const Btn = styled.div`
  width: 45px;
  height: 45px;
  margin-left: 10px;
  cursor: pointer;
  color: #045de9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ToDoContainer = styled.div`
  width: 500px;
  padding: 30px;
  border-radius: 10px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const ToDoItem = styled.div`
  width: 380px;
  margin: 15px;
  color: ${props => (props.isCompleted ? AppColors.grey : AppColors.black)};
  text-decoration: ${props => (props.isCompleted ? 'line-through' : 'none')};
  text-decoration-color: ${props => (props.isCompleted ? AppColors.grey : AppColors.black)};
`;

function Todo() {
  const [todo, setTodo] = useState([]);
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(new Array(todo.length).fill(false));
  const [title, setTitle] = useState('제목을 수정해보세요');
  const [titleChangeEnabled, enableTitleChange] = useState(false);
  const [tempText, setTempText] = useState('');
  const userId = localStorage.getItem('login-token');
  const navigate = useNavigate();

  const getTodos = () => {
    fetch('https://pre-onboarding-selection-task.shop/todos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    })
      .then(result => result.json())
      .then(result => setTodo(result));
  };

  useEffect(() => {
    if (!userId) {
      navigate(ROUTES.HOME);
    } else {
      getTodos();
    }
  }, []);

  const onTodoChange = async (e, index) => {
    const newTodo = [...todo];
    newTodo[index].todo = e.target.value;
    setTodo(newTodo);
  };

  const onTitleChange = e => {
    setTitle(e.target.value);
  };

  const Edit = async (index, editEnabled) => {
    const newEditArray = [...edit];
    newEditArray[index] = editEnabled;
    setEdit(newEditArray);
  };

  const updateTodoContent = async (index, editEnabled) => {
    const newTodo = [...todo];
    const newEditArray = [...edit];
    const listToUpdate = newTodo[index];
    newEditArray[index] = editEnabled;
    setEdit(newEditArray);
    try {
      const fetchData = await fetch(`https://pre-onboarding-selection-task.shop/todos/${listToUpdate.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userId}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: listToUpdate.todo, isCompleted: listToUpdate.isCompleted }),
      });
      return fetchData;
    } catch (error) {
      return null;
    }

  }
  const deleteTodo = async index => {
    const newList = [...todo];
    const listToDelete = newList[index];
    try {
      const fetchData = await fetch(`https://pre-onboarding-selection-task.shop/todos/${listToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      const result = await fetchData.json();
      return result;
    } catch (error) {
      return null;
    }
  };

  const updateTodo = async index => {
    const newTodoList = [...todo];
    const listToChange = newTodoList[index];
    listToChange.isCompleted = !listToChange.isCompleted;
    try {
      const fetchData = await fetch(`https://pre-onboarding-selection-task.shop/todos/${listToChange.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userId}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: listToChange.todo, isCompleted: listToChange.isCompleted }),
      });
      return fetchData;
    } catch (error) {
      return null;
    }
  };

  const createTodo = async newItem => {
    const newList = [...todo];
    try {
      const fetchData = await fetch('https://pre-onboarding-selection-task.shop/todos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userId}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: newItem }),
      });
      const result = await fetchData.json();
      newList.push(result);
      setTodo(newList);
      setTempText('');
    } catch (error) {
      return null;
    }
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const IconStyleSmall = { width: 20, height: 20, cursor: 'pointer' };
  const IconStyle = { width: 23, height: 23, cursor: 'pointer' };
  const today = new Date();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <Wrapper>
      <p className="Date">
        {`${today.getFullYear()}년 ${today.getMonth()}월 ${today.getDate()}일 ${weekdays[today.getDay()]}요일`}
      </p>
      {titleChangeEnabled ? (
        <TitleContainer>
          <Input
            name="todo"
            value={title}
            onChange={e => onTitleChange(e)}
            type="text"
            placeholder="제목을 입력하세요"
            borderWidth="1px"
            borderRadius="6px"
          />
          <AiOutlineCheck onClick={() => enableTitleChange(false)} />
        </TitleContainer>
      ) : (
        <h1
          onClick={() => enableTitleChange(!titleChangeEnabled)}
          style={{
            margin: '20px 0 30px 0',
            cursor: 'pointer',
            color: hover ? AppColors.textBlue : AppColors.black,
            textDecoration: hover ? 'underline' : 'none',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {title}
        </h1>
      )}
      <ToDoContainer>
        {todo.map((singleToDo, index) => {
          return (
            <RowContainer key={`todo-${index}`}>
              {singleToDo.isCompleted ? (
                <RiCheckboxCircleFill style={IconStyle} onClick={() => updateTodo(index)} />
              ) : (
                <RiCheckboxBlankCircleFill style={IconStyle} onClick={() => updateTodo(index)} />
              )}
              {!edit[index] ? (
                <ToDoItem isCompleted={singleToDo.isCompleted}>{singleToDo.todo}</ToDoItem>
              ) : (
                <Input
                  name="todo"
                  value={singleToDo.todo}
                  onChange={e => onTodoChange(e, index)}
                  type="text"
                  placeholder="항목을 추가하세요"
                  borderWidth="1px"
                  borderRadius="6px"
                />
              )}
              {edit[index] ?
                <AiOutlineCheck style={IconStyleSmall} onClick={() => updateTodoContent(index, !edit[index])} /> :
                <FiEdit style={IconStyleSmall} onClick={() => Edit(index, !edit[index])} />
              }
              <BsTrash style={IconStyleSmall} onClick={() => deleteTodo(index)} />
            </RowContainer>
          );
        })}
        <RowContainer>
          <Input
            name="todo"
            value={tempText}
            onChange={e => setTempText(e.target.value)}
            type="text"
            placeholder="항목을 추가하세요"
            borderWidth="1px"
            borderRadius="6px"
          />
          <Btn onClick={() => createTodo(tempText)}> 추가 </Btn>
        </RowContainer>
      </ToDoContainer>
    </Wrapper>
  );
}

export default Todo;
