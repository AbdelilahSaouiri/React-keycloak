import {Link, useParams} from "react-router-dom"
import axios from "axios";
import {useEffect, useState} from "react";

function Details() {
   const {id}=useParams()
   const [user,setUser]=useState({});
    const fetchUser=async ()=>{
      const resp= axios.get(`http://localhost:8085/api/v1/users/${id}`);
      const user= (await resp).data;
      setUser(user)
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <div>
            <h3>Details of User {user.firstName}</h3>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/update/${user.id}`} >Update</Link>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Details