import './App.css'
import { useFetchData } from './hooks/useFetchData'

interface childDetails {
  id: number;
  tutorId: number;
  nombre: string;
  apellido: string;
  dob: string;

}

function App() {
  const {data, isLoading, error} = useFetchData<childDetails[]>("/children");
  return (
    <>
      <h1>Hello World</h1> //pagina home

      {data?.map(elem => <p>{elem.nombre}</p>)}
    </>
  )
}

export default App
