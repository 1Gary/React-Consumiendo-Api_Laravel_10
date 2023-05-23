import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

export default function ListarCategoria()
{
    const [inputs, setInputs] = useState([]);
    const [categorias, setCategorias] = useState([]);
 
    //estado para traer la información
    useEffect(() =>{
        getCategorias();
    },[]);

    function getCategorias()
    {
        axios.get('http://127.0.0.1:8000/api/categoria')
        .then(function(response){
            console.log(response.data);
            setCategorias(response.data);
        });
        
    }
    const handleChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values =>({...values, [name]: value}));        
    }
    
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        
        axios.post('http://127.0.0.1:8000/api/addCategoria',inputs)
        .then(function(response){        
            console.log(response.data);
            getCategorias();
        });  
        console.log(inputs);    
    }
    
    const EliminarCat = (id) =>{

        axios.delete('http://127.0.0.1:8000/api/delcategoria/'+id)
        .then(function(response){        
            console.log(response.data);
            getCategorias();
        }); 

    }

    


    return(
        <div>
            <h1>Listar Categorias</h1>
            <form>
             
                <table cellPadding="10">
                <tbody>
                <tr>
                     <th>
                        <label>Categoria ID: </label>
                     </th>
                     <td>
                        <input type="text" name="id" readOnly onChange={handleChange} value={inputs.cat_id} />
                     </td>
                </tr>     
                <tr>
                     <th>
                        <label>Categoria: </label>
                     </th>
                     <td>
                        <input type="text" name="cat_nom" onChange={handleChange} value={inputs.cat_nom} />
                     </td>
                </tr>      
                <tr>
                  <th>
                    <label>Observacion:</label>
                  </th>
                <td>
                    <input type="text" name="cat_obs" onChange={handleChange} value={inputs.cat_obs} />
                </td>
                <td>
                    <input type="hidden" name="cat_est" onChange={handleChange} value={inputs.cat_est=1} />
                </td>
                </tr>  
                <tr>
                    
                        <td>
                            <button onClick={handleSubmit}>Guardar</button>
                        </td>                    
                </tr>        
                </tbody>
                </table>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Id Categoria</th>
                            <th>Categoria</th>
                            <th>Observacion</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        { categorias.map((cat,key) =>
                            <tr key={key}>
                                <td>{cat.id}</td>
                                <td>{cat.cat_nom}</td>
                                <td>{cat.cat_obs}</td>
                                <td>{cat.cat_est}</td>
                                <td>       
                                    <Link to={ `categoria/${cat.id}/editar` }>Editar</Link>                           
                                    <button onClick={()=> EliminarCat(cat.id)}>Eliminar</button>
                                </td>
                            </tr>
                          ) 
                        }
                    </tbody>
                </table>
        </div>
    )
}