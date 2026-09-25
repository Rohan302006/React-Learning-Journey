import { useEffect, useState } from "react";

function UserSearch() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");


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
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Today's Main thing
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>

            <label>
                Search Users:{" "}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>


            <button onClick={fetchUsers}>
                Refresh Users
            </button>

            {filteredUsers.length === 0 ? (<p> Users not found</p>) : 
                (filteredUsers.map((user) => (
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Username: {user.username}</p>
                    </div>
                )
                ))
            }

        </>
    )
}

export default UserSearch