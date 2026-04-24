import { useState, useEffect } from "react";

function Dashboard() {
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/dashboard", {
    headers: {
        Authorization: "Bearer " + token
    }
    })
    .then(res => res.json())
    .then(data => setMessage(data.message));
}, []);

const addComment = () => {
    //  VULNERABLE A XSS
    setComments([...comments, comment]);
};

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow p-4">
                        <h2 className="mb-4 text-center">{message}</h2>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                placeholder="Escribe un comentario"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                            <button className="btn btn-success" onClick={addComment}>
                                Agregar
                            </button>
                        </div>
                        <div className="mt-4">
                            <h5>Comentarios:</h5>
                            <ul className="list-group">
                                {comments.map((c, i) => (
                                    <li key={i} className="list-group-item">
                                        <span dangerouslySetInnerHTML={{ __html: c }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;