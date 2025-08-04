export default function EquationInput({ onSubmit }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const equation = formData.get('equation');
        onSubmit(equation);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="equation">Enter Equation:</label>
            <input type="text" id="equation" name="equation" required />
            <button type="submit">Solve</button>
        </form>
    );
}