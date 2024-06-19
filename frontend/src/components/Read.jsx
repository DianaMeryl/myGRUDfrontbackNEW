import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


export default function Read() {

    const [ student, setStudent ] = useState(null);
    const { id }= useParams();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:3000/students/${id}`)
        .then(res => {
            if (res.data) {
                setStudent(res.data);
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
    }, [id]);

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="d-flex vh-100 bg-info bg-opacity-25 justify-content-center align-items-center">
            <div className="w-50 rounded p-3">
                {student && (
                    <div>
                        <h2 className="text-primary  text-center mb-4 fw-bold">Student Details</h2>
                        <table className="customtable">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Courses</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        {student.Courses && student.Courses.length > 0 ? (
                                            <ul className="list-unstyled">
                                                {student.Courses.map((course, index) => (
                                                    <li key={index}>{course.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>No courses found for this student.</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-end mb-3'>
                            <Link to='/' className='btn btn-lg btn-primary'>Back</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}