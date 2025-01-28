// todos is an array 
// todos = [{},{}] 



// export function Todos({ todos }) {
//     return <div>
//         {
//             todos.map((todo,index) => {
//                 return <div> <h1>{todo.title}</h1>
//                     <h2>{todo.description}</h2>
//                     <b>{todo.completed ? "Completed" : "Mark as Complete"}</b>
//                 </div>
//             })
//         }
//     </div>
// }


export function Todos({ todos }) {
    return (
        <div>
            {todos.length > 0 ? (
                todos.map(({ title, description, completed }, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: "5px",
                        }}
                    >
                        <h1>{title}</h1>
                        <h2>{description}</h2>
                        <button>{completed ? "Completed" : "Mark as Complete"}</button>
                    </div>
                ))
            ) : (
                <h3>No todos to display</h3>
            )}
        </div>
    );
}
