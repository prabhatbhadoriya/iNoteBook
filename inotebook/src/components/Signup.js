import React from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const history = useNavigate()
    const host = "http://localhost:4000";
    const [credentials, setCredentials] = React.useState({name: "",email: "", password: ""});



    const onSubmit = async(e) => {
        e.preventDefault();
       
        
            const res2 = await fetch(`${host}/auth/createuser`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                 },
              body: JSON.stringify({
                  name: credentials.name,
                email: credentials.email,
                password: credentials.password,
              })      
          });
        
            const data = await res2.json();
            console.log(data);
            if(data.success) {
                console.log("success");
                localStorage.setItem("token", data.token);
                history("/");
                props.showAlert("Account Created Successfully!", "success");
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
            <h2 className='my-3'>Create an account to use iNoteBook</h2>

           <form onSubmit={onSubmit}>
                <div className="my-3">
                    <label htmlFor="name"  className="form-label">Name</label>
                    <input type="text" name='name'  onChange={onChange} value={credentials.name} className="form-control" id="name" aria-describedby="emailHelp" minLength={3} required/>                       
                </div>
                <div className="mb-3">
                    <label htmlFor="email"  className="form-label">Email address</label>
                    <input type="email" name='email' onChange={onChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />                       
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' onChange={onChange} value={credentials.password} className="form-control" id="password" minLength={3} required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Signup