import React, {useEffect, useState} from "react";
import './App.css';
import UserIcon from "./components/UserIcon/userIcon";
import Note from "./components/Note/note";
import { Route, Routes, useLocation } from 'react-router-dom'
import Description from "./components/Description/Description";

export default function App() {
    const location = useLocation()
    const [dataBase, setDataBase] = useState([
        {
            title: 'Backlog',
            issues: [],
            disabled: false,
            button_class: 'button'
        },
        {
            title: 'Ready',
            issues: [],
            disabled: true,
            button_class: 'button disabled'
        },
        {
            title: 'In Progress',
            issues: [],
            disabled: true,
            button_class: 'button disabled'
        },
        {
            title: 'Finished',
            issues: [],
            disabled: true,
            button_class: 'button disabled'
        }
    ])
    if (localStorage.getItem('array') == undefined)
        localStorage.setItem('array', JSON.stringify(dataBase))
    useEffect(() => {
        if (localStorage){
            const storage = localStorage.getItem('array');
            if (storage) {
                setDataBase(JSON.parse(storage));
            }
        }
    }, [])
    return (
        <div className="App">
            <header className="header">
                Awesome Kanban Board
                <UserIcon />
            </header>
            <main className={'main'}>
                <Routes>
                    <Route path='' element=
                        {<>
                            {JSON.parse(localStorage.getItem('array')).map((item,index) => {
                            return (
                            <Note key={item.title} issue={item.issues} index={index}
                                 dataBase={dataBase} setDataBase={setDataBase}/>
                            )})}
                        </>}
                    />
                    <Route path={location.pathname}
                           element={<Description id={location.pathname.substring(1)}
                                                 dataBase={dataBase} setDataBase={setDataBase}/>}
                    />
                </Routes>
            </main>
            <footer className={'footer'}>
                <div className={'footer_tasks'}>
                    <div>Active tasks: {dataBase[0].issues.length}</div>
                    <div>Finished tasks: {dataBase[3].issues.length}</div>
                </div>
                <div>
                    Kanban board by <a href={'mailto:darters@mail.ru'}>darters@mail.ru</a>, 2023
                </div>
            </footer>
        </div>
  );
}
