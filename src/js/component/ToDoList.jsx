import React from "react";
import '../../styles/index.css';
import { useState, useEffect } from "react";

export const ToDoList = () => {
    const [tareaNueva, setTareaNueva] = useState('');
    const [listadoTareas, setListadoTareas] = useState([]);

    const handleChange = (e) => {
        setTareaNueva(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.keyCode === 13 && tareaNueva.trim() !== '') {
            await fetchPutTask(tareaNueva);
            setTareaNueva('');
        }
    };

    const handleDelete = async (id) => {
        await fetchDeletetTask(id);
        await fetchGetTask();
    };

    const handleDeleteAllTasks = async () => {
        await fetchDeleteAllTasks();
        await fetchGetTask();
    };

    const fetchCreateUser = async () => {
        try {
            const resp = await fetch('https://playground.4geeks.com/todo/users/jdiezolivari', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await resp.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCreateUser();
        fetchGetTask();
    }, []);

    const fetchPutTask = async (tarea) => {
        const todos = { label: tarea, is_done: false };
        try {
            const resp = await fetch('https://playground.4geeks.com/todo/todos/jdiezolivari', {
                method: "POST",
                body: JSON.stringify(todos),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            await resp.json();
            await fetchGetTask();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGetTask = async () => {
        try {
            const resp = await fetch('https://playground.4geeks.com/todo/users/jdiezolivari', {
                method: "GET"
            });
            const data = await resp.json();
            setListadoTareas(data.todos);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDeletetTask = async (id) => {
        try {
            const resp = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (resp.ok) {
                return await resp.text(); // Error visto con Lucas
            }
            throw new Error("No se pudo borrar la tarea");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDeleteAllTasks = async () => {
        try {
            const resp = await fetch(`https://playground.4geeks.com/todo/users/jdiezolivari`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!resp.ok) {
                throw new Error("No se pudieron borrar las tareas");
            }
            await fetchCreateUser();
            setListadoTareas([]);
            console.log("Tareas eliminadas");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center mx-auto align-items-center flex-column">
                <h2 className="text-light display-2 mt-5">To Do List</h2>
                <div className="contenedor-tareas">
                    <input className="input-tarea" type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={tareaNueva} />
                    <div className="text-start p-3 fs-3">
                        {listadoTareas.map((tarea) => (
                            <ul key={tarea.id} className="listado-tareas d-flex justify-content-between border-bottom align-items-center">
                                <li className="w-100">{tarea.label}</li>
                                <span className="cruz fs-1 fw-bold" onClick={() => handleDelete(tarea.id)}>x</span>
                            </ul>
                        ))}
                    </div>
                    <p className="fs-3 text-primary">
                        {listadoTareas.length > 0 ? `Tareas pendientes: ${listadoTareas.length}` : 'No hay tareas pendientes'}
                    </p>
                    <button className="btn btn-danger mb-5" onClick={handleDeleteAllTasks}>ELIMINAR TODAS LAS TAREAS</button>
                </div>
            </div>
        </>
    );
};
