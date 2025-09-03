import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        branch: '',
        year: '',
        mobile: '',
        mail: '',
        amount: '',
        paymentMode: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) return 'Name is required';
                break;
            case 'branch':
                if (!value) return 'Branch is required';
                break;
            case 'year':
                if (!value) return 'Year is required';
                break;
            case 'mobile':
                if (!value) return 'Mobile number is required';
                if (!/^\d{10}$/.test(value)) return 'Enter a valid 10-digit mobile number';
                break;
            case 'mail':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
                break;
            case 'amount':
                if (!value) return 'Amount is required';
                if (isNaN(value) || Number(value) <= 0) return 'Enter a valid amount';
                break;
            case 'paymentMode':
                if (!value) return 'Payment mode is required';
                break;
            default:
                return '';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:4000/register', formData);
                setSuccessMessage(response.data.message);
                setErrorMessage('');
                setFormData({
                    name: '',
                    branch: '',
                    year: '',
                    mobile: '',
                    mail: '',
                    amount: '',
                    paymentMode: ''
                });
            } catch (error) {
                setSuccessMessage('');
                setErrorMessage('An error occurred. Please try again.');
            }
        } else {
            setSuccessMessage('');
            setErrorMessage('Please fix the errors before submitting.');
        }
    };

    return (
        <div style={{ width: 500, padding:'30px', margin: '5.5rem auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)', borderRadius:'5px'}}>
            <h3 className='text-center'>Registration Form</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='form-label'>Name</label>
                    <input
                        type="text"
                        name="name"
                        className='form-control'
                        placeholder='Enter your name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>
                <div className='form-group'>
                    <label className='form-label'>Branch</label>
                    <input
                        type="text"
                        name="branch"
                        className='form-control'
                        placeholder='Enter your branch'
                        value={formData.branch}
                        onChange={handleChange}
                    />
                    {errors.branch && <small className="text-danger">{errors.branch}</small>}
                </div>
                <div className='form-group'>
                    <label className='form-label'>Year</label>
                    <select
                        name="year"
                        className='form-control'
                        value={formData.year}
                        onChange={handleChange}
                    >
                        <option value="">Select year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    {errors.year && <small className="text-danger">{errors.year}</small>}
                </div>
                <div className='form-group'>
                    <label className='form-label'>Mobile No</label>
                    <input
                        type="text"
                        name="mobile"
                        className='form-control'
                        placeholder='Enter your mobile number'
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                    {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                </div>
                <div className='form-group'>
                    <label className='form-label'>Mail ID</label>
                    <input
                        type="email"
                        name="mail"
                        className='form-control'
                        placeholder='Enter your mail ID'
                        value={formData.mail}
                        onChange={handleChange}
                    />
                    {errors.mail && <small className="text-danger">{errors.mail}</small>}
                </div>
                <div className='form-group'>
                    <label className='form-label'>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        className='form-control'
                        placeholder='Enter amount'
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    {errors.amount && <small className="text-danger">{errors.amount}</small>}
                </div>
                <div className='form-group'>
                    <label className='form-label'>Payment Mode</label>
                    <select
                        name="paymentMode"
                        className='form-control'
                        value={formData.paymentMode}
                        onChange={handleChange}
                    >
                        <option value="">Select payment mode</option>
                        <option value="online">Online</option>
                        <option value="cash">Cash</option>
                    </select>
                    {errors.paymentMode && <small className="text-danger">{errors.paymentMode}</small>}
                </div>
                <div className='form-group text-center' style={{ marginTop: 20 }}>
                    <button type="submit" className='btn btn-success'>Submit</button>
                </div><br />
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </form>
        </div>
    );
};


export default RegistrationForm;