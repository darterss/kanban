import React from "react";
import {useNavigate} from "react-router-dom";
import './Description.css'

export default function Description({id, dataBase, setDataBase}){
    const navigate = useNavigate()
    let value = ''
    let placeholder = ''
    function handleSubmit (e){
        e.preventDefault()
        let newDataBase = [...dataBase]
        for (let noteIndex = 0; noteIndex<4; noteIndex++) {
            const issueIndex = newDataBase[noteIndex].issues.indexOf(newDataBase[noteIndex].issues.find(issue => issue.id == id))
            if (issueIndex !== -1) {newDataBase[noteIndex].issues[issueIndex].description = value
                break
            }
        }
        setDataBase([...newDataBase])
        localStorage.setItem('array', JSON.stringify(dataBase))
        navigate(-1)
    }

    function handleChange (e){
        value = e.target.value
    }

    function getIssue(){
        for (let noteIndex = 0; noteIndex<4; noteIndex++) {
            const issueIndex = dataBase[noteIndex].issues.indexOf(dataBase[noteIndex].issues.find(issue => issue.id == id))
            if (issueIndex !== -1) {
                value = dataBase[noteIndex].issues[issueIndex].description
                if (value === '') placeholder = 'This task has no description'
                return dataBase[noteIndex].issues[issueIndex]
            }
            }
        }

    return(
        <div className={'description_div'}>

            <form className={'description_form'} onSubmit={e => handleSubmit(e)}>
                <div>
                    <div className={'description_name'}>
                        {getIssue().name}
                    </div>
                    <textarea className={'description_area'} defaultValue={getIssue().description}
                              autoFocus={true} onChange={e => handleChange(e)} placeholder={placeholder}/></div>
                <button className={'description_button'}>X</button>
            </form>
        </div>
    )
}