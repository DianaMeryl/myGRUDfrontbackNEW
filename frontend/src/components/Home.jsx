import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Home() {

    const [ data, setData ] = useState([]);

    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:3000/students')
        .then(res => {
            if (res.data) {
                const studentsArray = Object.values(res.data);
                setData(studentsArray);
                console.log(res.data)
            } else {
                console.error('Неочікуваний формат даних:', res.data);
                setError('Помилка формату даних');
            }
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setError('Не вдалося отримати дані');
            setLoading(false);
        });
    }, [])

const handleDelete = (id) => {

    axios.delete(`http://localhost:3000/students/${id}`)
    .then(res => {location.reload();})
    .catch(err => {
        console.log(err);
    });
}

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;


return (
    <div className="d-flex vh-100 bg-primary bg-opacity-25 justify-content-center align-items-center ">
        <div className="w-50 rounded p-3 text-success text-center fst-italic fs-3">
            <div className='d-flex justify-content-end'>
                <Link to='/create' className='btn btn-success fs-4 mb-3'>Add Student</Link>
            </div>
            <table className="table table-bordered mx-auto " >
                <thead >
                    <tr className="table-info">
                        <th>Name</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((student, index) => {
                        return <tr key={index} className="table-success">
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.age}</td>
                            <td>
                                <Link to={`/read/${student.id}`} className="btn btn-md btn-info fs-4 me-2">Read</Link>
                                <Link to={`/edit/${student.id}`} className="btn btn-md btn-primary fs-4 me-2">Edit</Link>
                                <button className="btn btn-md btn-danger fs-4" onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    </div>
)
}

