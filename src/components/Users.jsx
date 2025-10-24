import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import keycloak from "./keycloak.js";
import {useKeycloak} from "@react-keycloak/web";


function Users()  {

    const [users,setUsers]=useState([]);
    const {keycloak,initialized}=useKeycloak();

    const fetchUsers=async ()=>{
        if (!initialized || !keycloak.authenticated) {
            return;
        }
        const resp=await axios.get("http://localhost:8085/api/v1/users");
        const data=(await resp).data;
        setUsers(data);
    }
    const isAdmin = keycloak.hasRealmRole("ADMIN");

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

        if (initialized && keycloak.authenticated) {
            fetchUsers();
        }
    }, [initialized, keycloak.authenticated]);

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
                        <th colSpan={2}>Action</th>
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
