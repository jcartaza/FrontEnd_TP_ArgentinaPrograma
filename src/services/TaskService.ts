import { Task } from "../types/Task";

const BASE_URL = 'https://backend-tp-final-agentinaprograma.onrender.com/tasks';

export const TaskService = {
    getAllTasks: async (): Promise <Task[]>=>{
        const response = await fetch (`${BASE_URL}`);
        const data = await response.json();
        return data;
    },

    getOneTask: async (id:number): Promise <Task>=>{
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log('TaskService - getOneTask:', data);
        return data;
    },

    getTaskInCategory: async (category:string):Promise<Task[]>=>{
        const response= await fetch (`${BASE_URL}?estado=${category}`);
        const data = await response.json();
        console.log('TaskService - getTaskInCategory:', data);
        return data;
    },

    deleteTask: async (id:number):Promise <void>=>{
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
    });
    },

    updateStateTask: async (id:number, newState: string): Promise <Task>=>{
        return fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {estado: newState}
            )
        })
        .then(res=> res.json())
        .then(json=>{
            return json;
        })
        .catch(error=>error);
    },

    createTask:async (task: Task): Promise <Task>=>{
        const response = await fetch(`${BASE_URL}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        console.log('TaskService - createTask:', data);
        return data;
    },
    
    
}