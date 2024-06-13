import { useState } from "react";

export default function NewTask({ onAdd }) {
    const [enteredTask, setEnteredTask] = useState('');
    const [responsibilityComplexity, setResponsibilityComplexity] = useState('');

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        if (enteredTask.trim() === '' || responsibilityComplexity === '') {
            return;
        }
        onAdd(responsibilityComplexity, enteredTask);
        setEnteredTask("");
        setResponsibilityComplexity("");
    }

    return (
        <div className="flex items-center gap-4">
            <input value={enteredTask} onChange={handleChange} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
            <select
                value={responsibilityComplexity}
                onChange={(e) => setResponsibilityComplexity(e.target.value)}
                className="Complexity"
                required>
                <option value="" disabled>Complexity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Responsibility</button>
        </div>
    );
}
