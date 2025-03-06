import { useState } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
// import UserContext from "./context";

export default function Register() {

    let [name, setName] = useState('');
    let [gmail, setGmail] = useState('');
    let [pass, setPass] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(name);
        console.log(gmail);
        console.log(pass);

        let item = { name: name, email: gmail, password: pass, amount: 1000 };

        axios.post('https://bank-server-1-c34h.onrender.com/create', item)
            .then(response => {
                setName('');
                setGmail('');
                setPass('');
                alert('Registration successful!');
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Registration failed. Please try again.');
            });
    }

    return (
        <>
            <div className="page-container">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <label>
                        Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label><br /><br />
                    <label>
                        Gmail: <input type="text" value={gmail} onChange={(e) => setGmail(e.target.value)} />
                    </label><br /><br />
                    <label>
                        Password: <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </label><br /><br />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </>
    );
}
