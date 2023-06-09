import React, {useState} from "react";
import './userIcon.css'
import DropDown from "../DopDown/DropDown";

export default function UserIcon(){
    const [imgArrow, setImgArrow] = useState(['img-arrow'])

    const handleClick = () => {
        if (!imgArrow.includes('rotate'))
            setImgArrow([...imgArrow, 'rotate'])
        else {
            const newArrow = imgArrow
            newArrow.splice(1, 1)
            setImgArrow([...newArrow])
        }
    }

    return(
        <>
            <div className={'container'} onClick={handleClick}>
                <img className={'img-photo'} alt={'user'} src={require('./user-avatar.png')}/>
                <img className={imgArrow.join(' ')} alt={'arrow down'} src={require('./arrow-down.png')}/>
            </div>
            {(imgArrow.includes('rotate')) && <DropDown />}
        </>

    )
}