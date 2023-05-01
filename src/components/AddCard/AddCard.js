import React, {useRef, useState} from "react";
import "./AddCard.css"
import { generateID } from "../../generateID";

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
            issue = [...issue, {
                id: generateID(),
                name: value,
                description: ''
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
        <form onSubmit={handleSubmit}>
            {showInput && <input className={'input'} placeholder={'New task title...'}
                                 onChange={handleChange} autoFocus={true}/>}
            {showSelect &&
                <select onChange={handleSelect} defaultValue={'default'} >
                    <option disabled={true} value={'default'}>select issue...</option>
                        {
                        dataBase[index-1].issues.map((item, ind) => {
                            return(
                                <option onClick={handleSelect} key={item.id} value={ind}>
                                    {item.name}
                                </option>
                                )})}
                </select>}
            <button className={dataBase[index].button_class}
                    disabled={dataBase[index].disabled} ref={refButton}>{buttonText}</button>
        </form>
    )
}

