import React from "react";
import './NoteItem.css';

export default function NoteItem({issue}){
    return (
       <>
           {issue.map(item => {
               return <div key={item.id} className={'div_note_item'}>{item.name}</div>
           })}
       </>
    )
}