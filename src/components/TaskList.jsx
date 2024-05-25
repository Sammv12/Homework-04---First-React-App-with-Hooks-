//https://pusher.com/tutorials/todo-app-react-hooks/#using-useeffect-to-monitor-the-number-of-uncompleted-tasks-remaining
//https://mauriciogc.medium.com/react-creando-una-app-to-do-list-con-create-react-app-y-el-hook-usestate-6ae378569705
//https://www.youtube.com/watch?v=1xvXWQWMoRY
//https://youtu.be/36a__1Vn6B8?si=zO4X3doxq6pVdMdl
//https://youtu.be/sHWsXj1_IdA?si=6byPq7azlUKhmsQz


import React, { useState, useEffect  } from "react";
import NoTaskImg from "../assets/notask.svg";
import Trash from '../assets/icons/trashcan.svg'
import '../components/TaskList.css'


export default function TaskList(){
    const [description, setDescription] = useState("");
    const [list, setList] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [completed, setCompleted] =useState(false);
   
    

    const handleChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (newTask.trim() === '') {
            return;
        }

        setList([{ description: newTask, completed: false }, ...list]);
        setNewTask("");
    }

    // const onChangeStatus = (index) => {

    //     setList(prevList => {
    //   const newList = [...prevList];



    //         newList[index].completed = true;




    //         setTimeout(() => {
    //             setList(currentList => currentList.filter((_, i) => i !== index));

    
    //         }, 4000); 

    //         return newList;
    //     });
    // };



    // i coundent figure out this part so i did use chatgpt
    const onChangeStatus = (index) => {
        setList(prevList => {
            const newList = [...prevList];
            newList[index].completed = true;
    
            return newList;
        });
    };
    
    
    useEffect(() => {
        const completedTasksIndexes = list.reduce((acc, task, index) => {
            if (task.completed) {
                acc.push(index);
            }
            return acc;
        }, []);
    
        const timeoutIds = completedTasksIndexes.map(index => {
            return setTimeout(() => {
                setList(currentList => currentList.filter((_, i) => i !== index));
            }, 4000);
        });
    
        return () => {
            timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, [list]);



     const removeTask = index => {


        const newTasks = [...list];

        newTasks.splice(index, 1);

        setList(newTasks);
    }

    

    return(
        <div className='container'>
                <h1>Task List</h1>

                <form onSubmit={handleSubmit}>
                    <div className='userinput'>
                    <input placeholder='Enter a new task' type="text" autoFocus value={newTask} onChange={handleChange}/>

                    <button 
                    className='createbutton' 
                    type="submit"
                    >
                        Create
                    </button>
                     </div>
                </form>

                <div className="containertask">

                {list.length === 0 ?(
                    <div className="noTask">  
                    <img src={NoTaskImg} alt='No tasks' />
                    <p>No tasks yet!</p>
                    </div>

                ): (
                    <div className='Tlist'>
                        {list.map((item, index) => (
                        <div key={index*3} className="taskItem">
                            <label className={`listLabel ${item.completed ? 'task-complete' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    checked={item.completed} 
                                    onChange={() => onChangeStatus(index)} 
                                />
                                {item.description}
                            </label>
                            <img 
                                src={Trash} 
                                alt='Trash Can' 
                                onClick={() => removeTask(index)} 
                                className="trash"
                            />
                        </div>
                    ))}
                    
                    
                
                    </div>
                )}
                    
                </div>
                

                

                
                

        </div>        
    )
}