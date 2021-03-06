import React,{ useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa'
import { useAppSelector,useAppDispatch } from '../Redux/store'
import { get_data } from '../Redux/data_reducer';
import './input.scss'

type options = {
    method: string;
    body: string;
    headers: object;
}

function Input() {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.data_reducer.data)
    const url = useAppSelector(state => state.redux.url)
    const[value,setValue] = useState('')


    const addNewTodo = ( title:  string ) => {
        let id = data.length ? data[data.length - 1].id + 1 : 1;
        let newTodo = { id,checked: false,title}
        console.log(` newTodo = ${newTodo}`);
        let updatedTodos = [...data,newTodo]
        dispatch(get_data(updatedTodos))
        const options = {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        try {fetch(url, options)}
        catch (error) {console.error(error)}  
    }

    const onSubmited = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(!value) return;
        setValue('')
        addNewTodo(value) // == put title on data and json-server
    }

    return (
        <form className='form' onSubmit={onSubmited}>
            <input
                type='text'
                id='input'
                autoFocus
                placeholder='new todo'
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <FaPlusSquare  
                className='icon submit'
                type='submit'
                onClick={onSubmited}
            />
        </form>
    )
}

export default Input;
