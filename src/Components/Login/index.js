import React, { useState } from 'react';
import { Button, FormGroup, Input,  Row, Col } from 'reactstrap';
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { storeUser } from '../../helpers';

const initialUser = {password: "", email: ""};

const Login = () => {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleChange = ({target}) => {
        const {name, value} = target;
        setUser((currentUser) => ({
    ...currentUser,
    [name]: value
        }))
    };

    const handleLogin = async () => {
        const url = `http://localhost:1337/api/auth/local`;
        try{
            if(user.identifier && user.password) {
                const {data} = await axios.post(url, user);
    if (data.jwt) {
        storeUser(data); 
        toast.success("Logged in Successfully!", {
            hideProgressBar: true,
        })
        setUser(initialUser);
        navigate("/");
    }            }
        } catch (error) {
            toast.error(error.message, {
                hideProgressBar: true,
            });
        }
    };

return  <Row className="login">
            <Col sm="12" md={{size: 5, offset: 4}} >
    <div>
        <h2>Login:</h2>
        <FormGroup>
            <Input type="email" 
            name="identifier" 
            value= {user.identifier} 
            onChange={handleChange} 
            placeholder="Enter email" />
        </FormGroup>        
        <FormGroup>
            <Input type="password" 
            name="password" 
            value= {user.password} 
            onChange={handleChange} 
            placeholder="Enter password" />
        </FormGroup> 
        <Button color="primary" onClick={handleLogin}>Login</Button>
        <h6>
            Click <Link to='/register'>Here</Link> to sign up
        </h6>
    </div>
</Col>

</Row>;

}

export default Login;