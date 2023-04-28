import React from "react";

export default function Description({description, setDescription, id}){
    let value = ''
    function handleSubmit (e){
        e.preventDefault()
        setDescription(value)
        console.log(id)
    }

    function handleChange (e){
        value = e.target.value
    }

    return(
        <>
            <form onSubmit={event => handleSubmit(event)}>
                <input type={'text'} defaultValue={description} onChange={e=>handleChange(e)}/>
                <button>Submit</button>
            </form>
        </>
    )
}