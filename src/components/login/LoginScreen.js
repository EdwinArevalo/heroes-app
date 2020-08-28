import React, {  useContext } from 'react'; 
import { types } from '../../types/types';
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = ({history}) => {

    const  {dispatch} = useContext(AuthContext);

    const [ values, handleInputChange ] = useForm({
        name: ''
    });

    const {name} = values;
    

    const handleLogin = (e) => {
        e.preventDefault();

        const lasPath = localStorage.getItem('lastPath') || '/';

        if(name.trim().length === 0 ){
            return;
        }
        
        dispatch({
            type: types.login,
            payload: {
                name
            }
        });
 
        
        history.replace(lasPath);
    } 

    return (
        <div className="container mt-5 text-center">
            <h1>Login</h1> 
            <hr/>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <form onSubmit={handleLogin} className="mx-auto">

                    <input 
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        autoComplete="off"
                        placeholder="Enter your name"
                        className="form-control"
                        />

                    <button 
                        type="submit"
                        className="btn btn-block btn-primary mt-1" 
                    >
                        Login
                    </button>
                    </form>
                <div className="col-4"></div>
                </div>
            </div>
            
        </div>
    )
}
