import React from "react";
import './NoteItem.css';
import { Link } from 'react-router-dom'

export default function NoteItem({issue}){
    return (
       <>
           {issue.map(item => {
               const link = '/' + item.id
               return (
               <div key={item.id} className={'note_item'}>
                   <Link to={link} className={'a'}>
                       {item.name}
                   </Link>
               </div>
               )})
           }
       </>
    )
}
