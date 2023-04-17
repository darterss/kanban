import React, {useRef, useState} from "react";
import "./AddCard.css"

export default function AddCard( {issue, dataBase, setDataBase, index} ) {
    const [showInput, setShowInput] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [buttonText, setButtonText] = useState('+ Add card')
    const refButton = useRef()
    let value = ''
    let firstClick = true

    function handleChange(e) {
        value = e.target.value
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (value && !index) {
            setShowInput(false)
            setButtonText('+ Add card')
            const newDataBase = [...dataBase]
            newDataBase[index].button_class = 'button'
            setDataBase([...newDataBase])
            firstClick = true
            const date = new Date()
            issue = [...issue, {
                id: date.getTime(),
                name: value,
                description: 'description'
            }]
            newDataBase[index].issues = [...issue]
            if (index < 3) {
                newDataBase[index + 1].disabled = false
                newDataBase[index + 1].button_class = 'button'
            }
            setDataBase([...newDataBase])
            localStorage.setItem('array', JSON.stringify(dataBase))
        }
        else if (firstClick && !index) {
            setShowInput(true)
            setButtonText('Submit')
            const newDataBase = [...dataBase]
            newDataBase[index].button_class = 'button push'
            setDataBase([...newDataBase])
            firstClick = false
        }
        else if (firstClick) {
            setShowSelect(true)
            const newDataBase = [...dataBase]
            newDataBase[index].button_class = 'button display_none'
            setDataBase([...newDataBase])
        }
    }
    function handleSelect (e) {
        if (e.target.value === 'select value...') return
        const newDataBase = [...dataBase]
        const transferIssue = newDataBase[index-1].issues.splice(e.target.value, 1)
        if (newDataBase[index-1].issues.length === 0) {
            newDataBase[index].button_class = 'button disabled'
            setDataBase([...newDataBase])
            newDataBase[index].disabled = true
        }
        else {
            newDataBase[index].button_class = 'button'
            setDataBase([...newDataBase])
        }
        newDataBase[index].issues.push(transferIssue[0])
        setShowSelect(false)
        if (index < 3) {
            newDataBase[index + 1].disabled = false
            newDataBase[index + 1].button_class = 'button'
        }
        setDataBase([...newDataBase])
        localStorage.setItem('array', JSON.stringify(dataBase))
    }
    return(
        <form onSubmit={e => handleSubmit(e)}>
            {showInput && <input className={'input'} onChange={e => handleChange(e)} autoFocus={true}/>}
            {showSelect &&
                <select onChange={e => handleSelect(e)}>
                    <option disabled={true} selected={true}>select issue...</option>
                        {
                        dataBase[index-1].issues.map((item, ind) => {
                            return(
                                <>
                                <option onClick={e => handleSelect(e)} key={item.id} value={ind}>
                                    {item.name}
                                </option>
                                </>)})}
                </select>}
            <button className={dataBase[index].button_class}
                    disabled={dataBase[index].disabled} ref={refButton}>{buttonText}</button>
        </form>
    )
}

