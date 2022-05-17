import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const history = useNavigate()
   
    const [credentials, setCredentials] = React.useState({email: "", password: ""});



    const onSubmit = async(e) => {
        e.preventDefault();
       
        
            const res2 = await fetch(`auth/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                 },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              })      
          });
        
            const data = await res2.json();
            console.log(data);
            if(data.success) {
                // console.log("success");
                localStorage.setItem("token", data.authtoken);               
                history("/");
                props.showAlert("Login Successful", "success");
            }
            else {
                
                props.showAlert("Invalid credentials", "danger");
            }
          
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }



    return (
        <div className='container mt-3'>
            <h2 className='my-3'>Login to continue to iNoteBook</h2>
            <form onSubmit={onSubmit}>
                <div className="my-3">
                    <label htmlFor="email"  className="form-label">Email address</label>
                    <input type="email" name='email' onChange={onChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp"/>                       
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' onChange={onChange} value={credentials.password} className="form-control" id="password"/>
                </div>
                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login