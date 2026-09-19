import { useEffect, useState } from "react"

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();

            setUsers(data);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            
            <button onClick={fetchUsers}>
                Refresh Users
            </button>

            {users.map((user) => (
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>City: { user.address.city}</p>
                    <hr />
                </div>
                
            ))
            }
        </>
    );
}

export default UserList 