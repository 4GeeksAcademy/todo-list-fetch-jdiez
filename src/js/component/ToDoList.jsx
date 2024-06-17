import React from "react";
import '../../styles/index.css'
import { useState, useEffect } from "react";

export const ToDoList = () => {

    const [tareaNueva, setTareaNueva] = useState('');
    const [listadoTareas, setListadoTareas] = useState([])


    const handleChange = (e) =>{
        setTareaNueva(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && tareaNueva.trim() !== '') {
            const nuevasTareas = [...listadoTareas, tareaNueva];
            setListadoTareas(nuevasTareas);
            fetchPutTask();
            setTareaNueva('');
        }
    };

    


    const handleDelete = async (id) => {
        await fetchDeletetTask(id);
        fetchGetTask();
    }

        const deletAllTasks = () => {
            setListadoTareas([])
        }

        const fetchCreateUser = () => {
            fetch('https://playground.4geeks.com/todo/users/jdiezolivari', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(resp => {
                  console.log(resp.ok); // Será true si la respuesta es exitosa
                  console.log(resp.status); // El código de estado 200, 300, 400, etc.
                  return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
              })
              .then(data => {
                    console.log(data);
              
            })
              .catch(error => {
                  // Manejo de errores
                  console.log(error);
              });
            }

            useEffect(() => {
                fetchCreateUser(); 
            },[])

            const todos = {label : tareaNueva, is_done: false}
            const fetchPutTask = () => {
            fetch('https://playground.4geeks.com/todo/todos/jdiezolivari', {
                method: "POST",
                body: JSON.stringify(todos),
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(resp => {
                  console.log(resp.ok); // Será true si la respuesta es exitosa
                  console.log(resp.status); // El código de estado 200, 300, 400, etc.
                  return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
              })
              .then(data => {
                  console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
                  fetchGetTask();

    
              })
              .catch(error => {
                  // Manejo de errores
                  console.log(error);
              });
            }


            const fetchGetTask = () => {
                fetch('https://playground.4geeks.com/todo/users/jdiezolivari', {
                    method: "GET",
                  })
                  .then(resp => {
                      console.log(resp.ok); // Será true si la respuesta es exitosa
                      console.log(resp.status); // El código de estado 200, 300, 400, etc.
                      return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
                  })
                  .then(data => {
                      console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
                      setListadoTareas(data.todos)
                      
                  })
                  .catch(error => {
                      // Manejo de errores
                      console.log(error);
                  });
                }
        
                useEffect(() => {
                    fetchGetTask();
                },[])

            
        

        const fetchDeletetTask = (id) => {
            fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(resp => {
                  console.log(resp.ok); // Será true si la respuesta es exitosa
                  console.log(resp.status); // El código de estado 200, 300, 400, etc.
                  return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
              })
              .then(resp => {
                if (resp.ok) {
                    return resp.text(); // Usa text() en lugar de json()
                }
                throw new Error('Failed to delete task');
            })
              .catch(error => {
                  // Manejo de errores
                  console.log(error);
              });
            }


   return ( 
    <>
    
   <div className="d-flex justify-content-center mx-auto align-items-center flex-column">
   <h2 className="text-light display-2 mt-5">To Do List</h2>
    
    <div className="contenedor-tareas">
        <input className="input-tarea" type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={tareaNueva}/>

        <div className="text-start p-3 fs-3">{listadoTareas.map((tarea, index) =><ul key={tarea.id} className="listado-tareas d-flex justify-content-between border-bottom align-items-center"> <li className="w-100">{tarea.label}</li><span className="cruz fs-1 fw-bold" onClick={() => handleDelete(tarea.id)}>x</span></ul>)}</div>


        {/* <div className="text-start p-3 fs-3">{listadoTareas.map((tarea, index) =><ul key={index} className="listado-tareas d-flex justify-content-between border-bottom align-items-center"> <li className="w-100">{tarea}</li><span className="cruz fs-1 fw-bold" onClick={() => handleDelete(index)}>x</span></ul>)}</div> */}
        <p className="fs-3 text-primary">{listadoTareas.length > 0 ? `Tareas pendientes: ${listadoTareas.length}` : 'No hay tareas pendientes'}</p>
        <button className="btn btn-danger mb-5" onClick={deletAllTasks}>ELIMINAR TODAS LAS TAREAS</button>
    </div>

    </div>
    </>
   )
}