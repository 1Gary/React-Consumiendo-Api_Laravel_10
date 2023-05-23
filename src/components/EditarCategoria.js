import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 

export default function EditarCategoria()
{
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const { cat_id } = useParams();

    //estado para traer la información
    useEffect(() => {
        console.log("Dato id ",cat_id);
        getCategoriaxId(cat_id);
    }, []);

    function getCategoriaxId(cat_id)
    {          
        try {

            axios.get('http://127.0.0.1:8000/api/categoriaID/' + cat_id)
            .then(function(response){
                console.log("Lectura de Datos");
                console.log(response.data);
                setInputs(response.data);
            });

            
        }
        catch(err)
        {
            console.log("Error :", err);
        }
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
        axios.put('http://127.0.0.1:8000/api/updateCategoria/'+inputs.id, inputs)
        .then(function(response){        
            console.log(response.data);
        }); 
        console.log(inputs);    
    }
    return(
        <div>
            <h1>Editar Categorias</h1>
            <form>
             
                <table cellPadding="10">
                <tbody>
                <tr>
                     <th>
                        <label>Categoria ID: </label>
                     </th>
                     <td>
                        <input value={inputs.id} type="text" name="id" readOnly onChange={handleChange}  />
                     </td>
                </tr>     
                <tr>
                     <th>
                        <label>Categoria: </label>
                     </th>
                     <td>
                        <input value={inputs.cat_nom} type="text" name="cat_nom" onChange={handleChange}  />
                     </td>
                </tr>      
                <tr>
                  <th>
                    <label>Observacion:</label>
                  </th>
                <td>
                    <input value={inputs.cat_obs} type="text" name="cat_obs" onChange={handleChange}  />
                </td>
                </tr> 
                <tr>
                  <th>
                    <label>Estado:</label>
                  </th>
                <td>
                    <input type="text" value={inputs.cat_est} name="cat_est" onChange={handleChange}  />
                </td>
                </tr> 
                <tr>
                    
                        <td>
                            <button onClick={handleSubmit}>Actualizar</button>
                        </td>                    
                </tr>        
                </tbody>
                </table>
            </form>
        </div>
    )
}