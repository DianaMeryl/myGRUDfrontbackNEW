import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function Create() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        age: '',
        courseIds: []
    });

    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/courses')
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/students', values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    alert('Студент уже існує');
                } else {
                    console.log(err);
                }
            });
    };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setValues(prevValues => {
            const courseIds = checked 
                ? [...prevValues.courseIds, value] 
                : prevValues.courseIds.filter(id => id !== value);
            return { ...prevValues, courseIds };
        });
    };

    return (
        <div className="d-flex vh-100 bg-danger bg-opacity-10 justify-content-center align-items-center">
            <div className="w-50 bg-info bg-opacity-10 rounded p-3 fs-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            placeholder='Enter First Name'
                            className='form-control form-control-lg custom-input'
                            onChange={e => setValues({ ...values, firstName: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            placeholder='Enter Last Name'
                            className='form-control form-control-lg custom-input'
                            onChange={e => setValues({ ...values, lastName: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
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
                    <button type="submit" className='btn btn-lg btn-info fw-bold'>Add</button>
                    </div>
                    <div className='d-flex justify-content-end mb-3'>
                    <Link to='/' className='btn btn-lg btn-primary'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}