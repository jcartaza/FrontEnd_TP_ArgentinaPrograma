import { Task } from "../../types/Task"
import {useFormik} from 'formik';
import { Modal, Form, Button } from "react-bootstrap";
import * as Yup from 'yup';
import { useEffect } from "react";

type ModalAgregarTareaProps={
    showModal: boolean;
    handleClose:()=> void;
    createTask:(newTask:Task)=>void;
}


const ModalAgregarTarea: React.FC<ModalAgregarTareaProps>= ({showModal, handleClose,createTask}) => {
  const validetionSchema= Yup.object({
    titulo: Yup.string().required('Este campo es obligatorio'),
    descripcion: Yup.string().required('Este campo es obligatorio'),
    tiempo: Yup.number().required('Este campo es obligatorio').integer('El tiempo debe ser en numeros').positive('El tiempo debe ser un numero positivo'),
    imagen: Yup.string().required('Este campo es obligatorio'),
    responsable: Yup.string().required('Este campo es obligatorio'),
    estado: Yup.string().required('Este campo es obligatorio'),
  });
  

  const formik= useFormik({
    initialValues:{
        titulo:'',
        descripcion:'',
        tiempo: 0,
        imagen:'',
        responsable:'',
        estado:'',
    },
    validationSchema: validetionSchema,

    onSubmit: async(values )=>{
        values.estado.toUpperCase();
        console.log('Datos del formulario', JSON.stringify(values));

        await createTask(values);//LLama a la funcion para agregar la nueva tarea
        handleClose(); // Cierra el modal despues de enviar el fomrulario
    }
  });

  useEffect(() => {
    if (!showModal) {
      // Reiniciar el formulario cuando el modal se cierra
      formik.resetForm();
    }
  }, [showModal, formik]);
  
  return(
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Agregue una tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
                {/**Titulo */}
                <div className="mb-3 mt-1">
                    <label htmlFor="titulo" className="form-label">Titulo</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id='titulo'
                    name='titulo'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.titulo}
                    />
                    {formik.touched.titulo && formik.errors.titulo?(
                        <div className="text-danger">{formik.errors.titulo}</div>
                    ): null}
                </div>
                    {/**Descrpcion */}
                <div className="mb-3 mt-1">
                    <label htmlFor="descripcion" className="form-label">Descrpcion</label>
                    <textarea 
                    className="form-control" 
                    id='descripcion'
                    name='descripcion'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.descripcion}
                    rows= {3}
                    cols={50}
                    />
                    {formik.touched.descripcion && formik.errors.descripcion?(
                        <div className="text-danger">{formik.errors.descripcion}</div>
                    ): null}
                </div>

                {/**Tiempo */}
                <div className="mb-3 mt-1">
                    <label htmlFor="tiempo" className="form-label">Tiempo</label>
                    <input 
                    placeholder="Ej: 30 dias"
                    type="number" 
                    className="form-control" 
                    id='tiempo'
                    name='tiempo'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tiempo}
                    />
                    {formik.touched.tiempo && formik.errors.tiempo?(
                        <div className="text-danger">{formik.errors.tiempo}</div>
                    ): null}
                </div>

                {/**Imagen */}
                <div className="mb-3 mt-1">
                    <label htmlFor="imagen" className="form-label">Imagen</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id='imagen'
                    name='imagen'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.imagen}
                    />
                    {formik.touched.imagen && formik.errors.imagen?(
                        <div className="text-danger">{formik.errors.imagen}</div>
                    ): null}
                </div>

                {/**Respnsable */}
                <div className="mb-3 mt-1">
                    <label htmlFor="responsable" className="form-label">Responsable</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id='responsable'
                    name='responsable'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.responsable}
                    />
                    {formik.touched.responsable && formik.errors.responsable?(
                        <div className="text-danger">{formik.errors.responsable}</div>
                    ): null}
                </div>

                {/**Estado */}
                <div className="mb-3 mt-1">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <Form.Select 
                    id='estado'
                    name='estado'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.estado}
                    >
                        <option value=''>Seleccion un estado</option>
                        <option value='PORHACER'>Por Hacer</option>
                        <option value='ENPRODUCCION'>En Produccion</option>
                        <option value='PORTESTEAR'>Por Testear</option>
                        <option value='COMPLETADA'>Completada</option>
                    </Form.Select>
                    {formik.touched.titulo && formik.errors.titulo?(
                        <div className="text-danger">{formik.errors.titulo}</div>
                    ): null}
                </div>
                
                <div className="text-end">
                    <Button className='px-5' variant='primary' type='submit'  >Enviar</Button>
                </div>
            
            </Form>
        
        </Modal.Body>
    
    </Modal>
  )
};

export default ModalAgregarTarea;