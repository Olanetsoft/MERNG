import { useState } from 'react'


export const useForm = (callback, initialState = {}) => {

     // set initial state
     const [values, setValues] = useState(initialState)

    // onchange
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }

}