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
                    <input type="text" name="a11" onChange={handleChange} className="numeric-text" inputMode="decimal" />
                </label>
                <label>
                    A12:
                    <input type="text" name="a12" onChange={handleChange} className="numeric-text" inputMode="decimal" />
                </label>
                <label>
                    A21:
                    <input type="text" name="a21" onChange={handleChange} className="numeric-text" inputMode="decimal" />
                </label>
                <label>
                    A22:
                    <input type="text" name="a22" onChange={handleChange} className="numeric-text" inputMode="decimal" />
                </label>
            </div>
            <div>
                <label>
                    A31:
                    <input type="text" name="a31" onChange={handleChange} className="numeric-text" inputMode="decimal" />
                </label>
                <label>
                    A32:
                    <input type="text" name="a32" onChange={handleChange} className="numeric-text" inputMode="decimal" />
                </label>
                <label>
                    A33:
                    <input type="text" name="a33" onChange={handleChange} className="numeric-text" inputMode="decimal" />
                </label>
            </div>
            <button type="submit">Submit Matrix</button>
        </form>
    );
};

export default MatrixInput;