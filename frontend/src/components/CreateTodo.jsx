// import { useState } from "react";

// export function CreateTodo() {

//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");

//     return <div>
//         <input id="title" style={{
//             padding: 10, margin: 10
//         }} type="text" placeholder="title" onChange={(e) => {
//             const value = e.target.value;
//             setTitle(e.target.value);
//         }}></input> <br />
//         <input id="desc" style={{
//             padding: 10, margin: 10
//         }} type="text" placeholder="description" onChange={(e) => {
//             const value = e.target.value;
//             setDescription(e.target.value);
//         }}></input><br />

//         <button style={{
//             padding: 10, margin: 10
//         }} onClick={() => {
//             // use axios for simplicity 
//             fetch("https://localhost:3000/todo", {
//                 method: "POST",
//                 body: JSON.stringify({
//                     title: title,
//                     description: description
//                 }),
//                 headers: {
//                     "content-type": "application/json"
//                 }
//             })
//                 .then(async (res) => {
//                     const json = await res.json();
//                     alert("Todo added ");
//                 })
//         }} >Add a Todo</button>
//     </div>
// }











import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        // Validate input fields
        if (!title.trim() || !description.trim()) {
            alert("Please fill out all fields");
            return;
        }

        setLoading(true); // Show loading state

        // Sending POST request using fetch API
        fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    // Handle non-200 responses (e.g., 400, 500)
                    throw new Error("Failed to add todo. Please try again.");
                }
                const json = await res.json();
                alert("Todo added successfully");
                setTitle(""); // Reset input fields after success
                setDescription("");
            })
            .catch((err) => {
                // Catch any network or other errors
                console.error("Error:", err);
                alert(err.message); // Show error message to user
            })
            .finally(() => {
                setLoading(false); // Hide loading state
            });
    };

    return (
        <div>
            <input
                id="title"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title state
            />
            <br />
            <input
                id="desc"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update description state
            />
            <br />
            <button
                style={{ padding: 10, margin: 10 }}
                onClick={handleSubmit}
                disabled={loading} // Disable button while loading
            >
                {loading ? "Adding Todo..." : "Add a Todo"} {/* Show loading text */}
            </button>
        </div>
    );
}

