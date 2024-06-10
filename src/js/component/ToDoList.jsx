import React from "react";
import '../../styles/index.css'
import { useState, useEffect } from "react";

export const ToDoList = () => {

    const [tareaNueva, setTareaNueva] = useState('');
    const [listadoTareas, setListadoTareas] = useState([])


    const handleChange = (e) =>{
        setTareaNueva(e.target.value)
    }

    const handleKeyDown = (e) =>{
            if (e.keyCode === 13) {
                setListadoTareas([...listadoTareas,tareaNueva]);
            }
        }

        const handleDelete = (indexDelete) => {
            setListadoTareas(listadoTareas.filter((tarea, index) => index !== indexDelete))
        }

  

   return ( 
    <>
    
   <div className="d-flex justify-content-center mx-auto align-items-center flex-column">
   <h2 className="text-light display-2 mt-5">To Do List</h2>
    
    <div className="contenedor-tareas">
        <input className="input-tarea" type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={tareaNueva}/>
        <div className="text-start p-3 fs-3">{listadoTareas.map((tarea, index) =><ul key={index} className="listado-tareas d-flex justify-content-between border-bottom align-items-center"> <li className="w-100">{tarea}</li><span className="cruz fs-1 fw-bold" onClick={() => handleDelete(index)}>x</span></ul>)}</div>
        <p className="fs-3 text-primary">Tareas pendientes: {listadoTareas.length}</p>
    </div>

    </div>
    </>
   )
}