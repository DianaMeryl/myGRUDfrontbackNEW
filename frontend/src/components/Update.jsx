import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Update() {

    const [ values, setValues ] = useState({
        firstName: "",
        lastName: "",
        age: "",
        courseIds: []
    });

    const navigate = useNavigate();
    const { id }= useParams();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/courses')
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(()=>{
        axios.get(`http://localhost:3000/students/${id}`)
        .then(res => {
            if (res.data) {
                const student = res.data;
                setValues({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    age: student.age,
                    courseIds: student.courseIds || []
                });
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

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setValues(prevValues => {
            const courseIds = checked 
                ? [...prevValues.courseIds, value] 
                : prevValues.courseIds.filter(id => id !== value);
            return { ...prevValues, courseIds };
        });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/students/${id}`, values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="d-flex vh-100 bg-info bg-opacity-25 justify-content-center align-items-center">
            <div className="w-50 bg-danger bg-opacity-25 rounded p-3 fs-3">
                <form onSubmit={handleUpdate}>
                    <h2 className="text-primary  text-center mb-4 fw-bold">Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            value={values.firstName}
                            placeholder='Enter First Name'
                            className='form-control form-control-lg custom-input'
                            onChange={e => setValues({ ...values, firstName: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            value={values.lastName}
                            placeholder='Enter Last Name'
                            className='form-control form-control-lg custom-input'
                            onChange={e => setValues({ ...values, lastName: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            value={values.age}
                            placeholder='Enter Age'
                            className='form-control form-control-lg custom-input'
                            onChange={e => setValues({ ...values, age: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                    <label htmlFor="courses">Courses</label>
                        <div className='form-check'>
                            {courses.map(course => (
                                <div key={course.id}>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id={`course-${course.id}`} 
                                        value={course.id} 
                                        onChange={handleCourseChange} 
                                    />
                                    <label className="form-check-label" htmlFor={`course-${course.id}`}>
                                        {course.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                    <button type="submit" className='btn btn-md btn-info fw-bold fs-3'>Update</button>
                    </div>
                    <div className='d-flex justify-content-end mb-3'>
                        <Link to='/' className='btn btn-primary fs-3'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}