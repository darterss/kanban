import React, {useState} from "react";
import './App.css';
import UserIcon from "./components/UserIcon/userIcon";
import Note from "./components/Note/note";



function App() {
    const [dataBase, setDataBase] = useState([
        {
            title: 'Backlog',
            issues: [
                {
                    id: '1',
                    name: 'Sprint bugfix',
                    description: 'Fix all the bugs'
                },
                {
                    id: '11',
                    name: 'Sprint bugfixxxxxx',
                    description: 'Fix all the bugsssssss'
                }
            ]
        },
        {
            title: 'Ready',
            issues: [
                {
                    id: '12',
                    name: 'Second',
                    description: 'Fix second'
                }
            ]
        },
        {
            title: 'In Progress',
            issues: [
                {
                    id: '123',
                    name: 'third',
                    description: 'Fix third'
                }
            ]
        },
        {
            title: 'Finished',
            issues: [
                {
                    id: '1234',
                    name: 'Fourth',
                    description: 'Fix fourth'
                }
            ]
        }
    ])
    localStorage.setItem('array', JSON.stringify(dataBase))
    return (
        <div className="App">
            <header className="header">
                Awesome Kanban Board
                <UserIcon />
            </header>
            <main className={'main'}>
                {JSON.parse(localStorage.getItem('array')).map((item,index) => {
                return (
                    <Note key={item.title} title={item.title} issue={item.issues} index={index}
                          dataBase={dataBase} setDataBase={setDataBase}/>
                )})}
            </main>
            <footer className={'footer'}>
                hello
            </footer>
        </div>
  );
}

export default App;
