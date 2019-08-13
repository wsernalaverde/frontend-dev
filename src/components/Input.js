import React from 'react'

function Input({label, type, id, name, value, onChange}){
    return(
        <>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type} 
                name={name} 
                id={id}
                className="form-control" 
                value={value} 
                onChange={onChange}
            />
        </>
    )
}

export default Input