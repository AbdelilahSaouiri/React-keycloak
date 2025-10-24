import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import keycloak from "./keycloak.js";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchUser = async () => {
            try {
                const resp = await axios.get(`http://localhost:8085/api/v1/users/${id}`);
                if (!mounted) return;
                const u = resp.data || {};
                setForm({
                    firstName: u.firstName ?? "",
                    lastName: u.lastName ?? "",
                    email: u.email ?? "",
                });
            } catch (err) {
                console.error(err);
                setError("Impossible de charger l'utilisateur");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            mounted = false;
        };
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8085/api/v1/users/${id}`,
                form,{
                    headers:{
                 Authorization: `Bearer ${keycloak.token}`
                }
                }
                );
            navigate(`/`);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la mise à jour");
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h2>
                Modifier utilisateur #{id} — {form.firstName} {form.lastName}
            </h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom</label>
                    <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Nom</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} />
                </div>

                <div>
                    <label>Email</label>
                    <input name="email" value={form.email} onChange={handleChange} />
                </div>

                <button type="submit">Sauvegarder</button>
                <button type="button" onClick={() => navigate(-1)}>
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default Update;
