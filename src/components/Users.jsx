import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import keycloak from "./keycloak.js";


function Users()  {

    const [users,setUsers]=useState([]);
    const fetchUsers=async ()=>{
        const resp=await axios.get("http://localhost:8085/api/v1/users");
        const data=(await resp).data;
        setUsers(data);
    }

    const details=(id)=>{
        console.log(id)
    }
    const updateUser=(id)=>{
        console.log("update "+id)
    }

   const logout=()=>{
        keycloak.logout();
   }
    useEffect(() => {
        fetchUsers()
    }, []);

    return(
        <div>
            <button onClick={()=>logout()}>Logout</button>
            <h2>La Liste de Users</h2>

            <br/>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>Email</th>
                        {keycloak.hasRealmRole("ADMIN") &&
                        <th>colSpan={2}>Action</th>
                        }

                </tr>
                </thead>
                <tbody>
                {users.map(user=>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            {keycloak.hasRealmRole("ADMIN") &&
                                <Link to={`/details/${user.id}`} >Details</Link>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default Users
