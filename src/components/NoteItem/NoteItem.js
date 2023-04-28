import React from "react";
import './NoteItem.css';
import { HashRouter, Route, Link, Routes, useLocation, Outlet, useParams } from 'react-router-dom'

export default function NoteItem({issue, dataBase, setDataBase, index}){
    const location = useLocation()
    function handleClick (item) {
        let newDataBase = [...dataBase]
        const issueIndex = newDataBase[index].issues.indexOf(newDataBase[index].issues.find(i => i.id === item.id))
        newDataBase[index].issues[issueIndex].description = 'Changed description'

        setDataBase([...newDataBase])
        localStorage.setItem('array', JSON.stringify(dataBase))
    }
    return (
       <>
           {issue.map(item => {
               const link = '/' + item.id
               return (
               <div key={item.id} className={'note_item'} onClick={() => handleClick(item)}>
                   <Link to={link}>
                       {item.name}
                   </Link>
               </div>
               )})
           }
       </>
    )
}
