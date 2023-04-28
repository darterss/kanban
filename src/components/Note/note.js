import React from "react";
import './note.css'
import NoteItem from "../NoteItem/NoteItem";
import AddCard from "../AddCard/AddCard";
export default function Note( {issue, dataBase, setDataBase, index} ) {

    return(
        <div className={'div_note'}>
            {dataBase[index].title}
            <NoteItem issue={issue} dataBase={dataBase} setDataBase={setDataBase} index={index}/>
            <AddCard issue={issue} dataBase={dataBase} setDataBase={setDataBase} index={index}/>
        </div>
    )
}