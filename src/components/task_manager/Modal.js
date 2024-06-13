import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Button from "./Button.js";

const Modal = forwardRef(
    function Modal({ children, buttonCaption }, ref) {
        const [isOpen, setIsOpen] = useState(false);
        const dialog = useRef();

        useImperativeHandle(ref, () => ({
            open() {
                setIsOpen(true);
            },
            close() {
                setIsOpen(false);
            }
        }));

        const handleClose = () => {
            setIsOpen(false);
        };

        return isOpen && createPortal(
            <dialog ref={dialog} open className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'>
                {children}
                <form method="dialog" className="mt-4 text-right">
                    <Button onClick={handleClose}>{buttonCaption}</Button>
                </form>
            </dialog>,
            document.getElementById("modal-root")
        );
    }
);

export default Modal;
