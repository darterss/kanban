import React, {useEffect, useState} from "react";
import './App.css';
import UserIcon from "./components/UserIcon/userIcon";
import Note from "./components/Note/note";
import { HashRouter, Route, Link, Routes, useLocation, Outlet, useParams } from 'react-router-dom'
import Description from "./components/Description/Description";

function App() {
    const [description, setDescription] = useState('This task has no description')
    const location = useLocation()
    //console.log('in App   ' + location)
    const [dataBase, setDataBase] = useState([
        {
            title: 'Backlog',
            issues: [
                {
                    id: '1',
                    name: 'Sprint bugfix',
                    description: 'Fix all the bugs'
                }
            ],
            disabled: false,
            button_class: 'button'
        },
        {
            title: 'Ready',
            issues: [
                {
                    id: '12',
                    name: 'Second',
                    description: 'Fix second'
                }
            ],
            disabled: false,
            button_class: 'button'
        },
        {
            title: 'In Progress',
            issues: [
                {
                    id: '123',
                    name: 'third',
                    description: 'Fix third'
                }
            ],
            disabled: false,
            button_class: 'button'
        },
        {
            title: 'Finished',
            issues: [
                {
                    id: '1234',
                    name: 'Fourth',
                    description: 'Fix fourth'
                }
            ],
            disabled: false,
            button_class: 'button'
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
                    <Route path='/123' element={<div>123</div>} />
                    <Route path='' element={<>
                        {JSON.parse(localStorage.getItem('array')).map((item,index) => {
                        return (
                    <Note key={item.title} issue={item.issues} index={index}
                          dataBase={dataBase} setDataBase={setDataBase}/>
                    )})}
                    </>} />
                    <Route path={location.pathname}
                           element={<Description description={description} id={location.pathname.substring(1)}
                                                 setDescription={setDescription}/>} />
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

export default App;
