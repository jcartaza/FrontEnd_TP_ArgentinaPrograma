import { useEffect, useState } from "react"
import CarouselHome from "../components/CarouselHome/CarouselHome"
import CategoriasSelector from "../components/CategoriasSelector/CategoriasSelector"
import CategoriasTareas from "../components/CategoriasTareas/CategoriasTareas"
import { TaskService } from "../services/TaskService"
import { Task } from "../types/Task"






const LandingPage = () => {

  const [tasks, setTasks]= useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks]=useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory]=useState<string>('');

  useEffect(()=>{
    const fetchTasks = async ()=>{
      const tasksData = await TaskService.getAllTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  },[])

  //efecto para filtrar las tareas cuaando se selecciona una categoria
  useEffect(()=>{
    if(selectedCategory){
      const filtered = tasks.filter(task => task.estado && task.estado.toUpperCase() === selectedCategory.toUpperCase());
      setFilteredTasks(filtered);
    }else {
      setFilteredTasks(tasks);//si no hay categoria seleccionada, mostrar todas las tareas
    }
  },[selectedCategory, tasks])

  return (
    <>
        <CarouselHome/>
        <CategoriasSelector onSelectedCategory={setSelectedCategory}/>
        <CategoriasTareas tasks={filteredTasks.length > 0 ? filteredTasks : tasks}/>
    </>
  )
}

export default LandingPage