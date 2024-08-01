'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskCard from './NewTaskCard';
import Alert from './Alert';
import BtnDelete from './BtnDelete';
import BtnNewTask from './BtnNewTask';
import api from '@/app/api/axiosConfig';

// Definição da interface Task
interface Task {
    idTasks: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'in progress' | 'completed';
    IdUser: number,
}

interface CardTasksProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | undefined
}

export default function CardTasks({ user }: CardTasksProps) {
    const [data, setData] = useState<Task[] | null>(null);
    const [reload, setReload] = useState<boolean>(false)
    const [newTaks, setNewTasks] = useState<boolean>(false)
    const [userId, setUserId] = useState<number | undefined>(0)

    useEffect(() => {
        if (!userId) return

        axios.get(`http://localhost:3001/api/tasks?users=${userId}`)
            .then(response => {
                setData(response.data.sort((a: any, b: any) => b.idTasks - a.idTasks));
                setReload(false);
            })
            .catch(error => {
                console.log(error);
            });

    }, [reload, newTaks, userId]);


    useEffect(() => {
        if (data?.length) {
            setUserId(data[0].IdUser)
            return
        }

        axios.get(`http://localhost:3001/api/users?name=${user?.name}`)
            .then(response => {
                setUserId(response.data[0].idUser);

            }).catch(error => {
                console.log(error);
            });
    }, [data]);

    const onClickInProgress = ({ idTasks }: Task, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        axios.put(`http://localhost:3001/api/tasks/${idTasks}`, { status: 'in progress' })
            .then(response => {
                setReload(true)
            })
            .catch(error => {
                console.error('Error updating task status', error);
            })
    }

    const onClickCompleted = ({ idTasks }: Task, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        axios.put(`http://localhost:3001/api/tasks/${idTasks}`, { status: 'completed' })
            .then(() => {
                setReload(true)
            })
            .catch(error => {
                console.error('Error updating task status', error);
            })
    }

    const onClickDelete = ({ idTasks }: Task, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        axios.delete(`http://localhost:3001/api/tasks/${idTasks}`)
            .then(() => {
                setReload(true)
            })
            .catch(error => {
                console.error('Error updating task status', error);
            })
    }

    const onClickCreate = (e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault()

        setNewTasks(!newTaks)
    }

    const handleCreateTask = () => {
        setNewTasks(false);
        setReload(true);
    };

    const replaceDueDate = (dateString: string) => {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedDate = formatter.format(date);
        return formattedDate;
    }

    return <>
        <BtnNewTask onAddTask={onClickCreate} />
        {newTaks && <NewTaskCard userId={userId} onTaskCreated={handleCreateTask} />}
        {data?.map(task => (
            <div key={task.idTasks} className="card bg-base-100 w-1/3 shadow-xl">
                <div className="card-body">
                    <Alert message={`Taks is ${task.status}`} >
                        <div className="">Due Date: {replaceDueDate(task.dueDate)}</div>
                    </Alert>
                    <div className="container mt-3 mb-5">
                        <h2 className="card-title text-2xl mb-3 border-0 border-b-2 pb-1 border-gray-500">{task.title} </h2>
                        <p>{task.description}</p>
                    </div>
                    <div className="card-actions justify-end ">
                        {task.status === 'pending' && <button onClick={(btn) => onClickInProgress(task, btn)} className="btn btn-active btn-primary">in-progress</button>}
                        {task.status === 'in progress' && <button onClick={(btn) => onClickCompleted(task, btn)} className="btn btn-active btn-accent">completed</button>}
                        <BtnDelete onClick={el => onClickDelete(task, el)} />
                    </div>
                </div>
            </div>
        ))}
    </>
}

