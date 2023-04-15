import React, {useState} from "react";
import "./AddCard.css"





export default function AddCard( {issue, dataBase, setDataBase, index} ) {
    const [showInput, setShowInput] = useState(false);
    const [buttonText, setButtonText] = useState('+ Add card')
    const [className, setClassName] = useState('button')
    let value = ''
    let firstClick = true

    function handleClick() {
        if(firstClick) {
            setShowInput(true)
            setButtonText('Submit')
            setClassName(`button push`)
            firstClick = false
        }
    }
    function handleChange(e) {
        value = e.target.value
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (!firstClick && value && index === 0) {
            setShowInput(false)
            setButtonText('+ Add card')
            setClassName(`button`)
            firstClick = true
            const newDataBase = [...dataBase]
            const date = new Date()
            issue = [...issue, {
                id: date.getTime(),
                name: value,
                description: 'new Fix third'
            }]
            newDataBase[index].issues = [...issue]
            setDataBase([...newDataBase])
            localStorage.setItem('array', JSON.stringify(dataBase))
            console.log(e.target.value)
            console.log(dataBase)
        }
    }
    return(
        <form onSubmit={e => handleSubmit(e)}>
            {showInput && <input className={'input'} onChange={e => handleChange(e)}/>}
            <button className={className} onClick={(e) => handleClick(e)}>{buttonText}</button>
        </form>
    )
}

