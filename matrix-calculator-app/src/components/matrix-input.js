import React, { useState } from 'react';

const MatrixInput = ({ onMatrixSubmit }) => {
    const [matrix, setMatrix] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatrix({
            ...matrix,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onMatrixSubmit(matrix);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Matrix Input</h2>
            <div>
                <label>
                    A11:
                    <input type="number" name="a11" onChange={handleChange} />
                </label>
                <label>
                    A12:
                    <input type="number" name="a12" onChange={handleChange} />
                </label>
                <label>
                    A21:
                    <input type="number" name="a21" onChange={handleChange} />
                </label>
                <label>
                    A22:
                    <input type="number" name="a22" onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    A31:
                    <input type="number" name="a31" onChange={handleChange} />
                </label>
                <label>
                    A32:
                    <input type="number" name="a32" onChange={handleChange} />
                </label>
                <label>
                    A33:
                    <input type="number" name="a33" onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Submit Matrix</button>
        </form>
    );
};

export default MatrixInput;