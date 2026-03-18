import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
})

export interface Task{
    id: string;
    title: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get("/tasks")
    return response.data.data;
}

export const createTask = async (title: string)=> {
    const response = await api.post("/tasks", {title, completed: false});
    return response.data.data;
}

export const toggleTask = async ({id, completed, title}: {id: string, completed: boolean, title: string}) => {
       const response = await api.patch(`/tasks/${id}`, {title, completed});
       return response.data.data; 
}

export const deleteTask = async (id: string) => {
       const response = await api.delete(`/tasks/${id}`);
       return response.data;
}