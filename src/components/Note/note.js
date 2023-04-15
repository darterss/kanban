import React from "react";
import './note.css'
import NoteItem from "../NoteItem/NoteItem";
import AddCard from "../AddCard/AddCard";
export default function Note( {title, issue, dataBase, setDataBase, index} ) {

    return(
        <div className={'div_note'}>
            {title}
            <NoteItem issue={issue}/>
            <AddCard issue={issue} dataBase={dataBase} setDataBase={setDataBase} index={index}/>
        </div>
    )
}