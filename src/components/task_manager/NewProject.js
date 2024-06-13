import Input from "./Input.js";
import React, { useRef } from "react";
import Modal from "./Modal.js";

export default function NewProject({ onAdd, onCancel }) {
    const modal = useRef();

    const titleRef = useRef();
    const descRef = useRef();
    const dueDateRef = useRef();

    function handleSave(event) {
        event.preventDefault();

        const enteredTitle = titleRef.current.value;
        const enteredDesc = descRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        if (enteredTitle.trim() === '' || enteredDesc.trim() === '' || enteredDueDate.trim() === '') {
            // show an error
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDesc,
            dueDate: enteredDueDate,
        });
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-900 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops ...looks like you forgot to enter a value</p>
                <p className="text-stone-600 mb-4">Make sure to enter all the values</p>
            </Modal>

            <div className="w-[35rem] mt-16">
                <form onSubmit={handleSave}>
                    <div>
                        <Input ref={titleRef} label="Title" required></Input>
                        <Input ref={descRef} label="Description" textarea required></Input>
                        <Input ref={dueDateRef} label="Due Date" type="date" required></Input>
                    </div>
                    <menu className="flex items-center justify-end gap-4 my-4">
                        <li>
                            <button type="button" className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
                        </li>
                        <li>
                            <button type="submit" className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
                        </li>
                    </menu>
                </form>
            </div>
        </>
    );
}
