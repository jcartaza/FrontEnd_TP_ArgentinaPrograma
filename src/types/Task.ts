export interface Task {
    titulo: string;
    descripcion:string;
    tiempo:number;
    imagen:string;
    responsable:string;
    estado:string;
    id?: number;
}