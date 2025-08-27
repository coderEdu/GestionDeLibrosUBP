import type { Task } from "../../../components/my-books/MyBooks";

interface Props {
  lista: Task[]
  marcarComoCompletada: (indice: string ) => void;
  eliminarTarea: (indice: string) => void;
}

const ListaTareas = ({lista, marcarComoCompletada, eliminarTarea}: Props) => {
  return (
    <div>
      <ul>
        {lista.map((tarea, index) => (
          //<TareaComponent tarea={tarea} marcarComoCompletada={marcarComoCompletada} eliminarTarea={eliminarTarea} arrayIndice={index} />
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;