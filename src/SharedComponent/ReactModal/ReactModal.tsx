
import Modal from 'react-modal';
import { MdOutlineCancel } from "react-icons/md";
import { ReactNode } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
interface ModalProps {
    children: ReactNode;
    modalIsOpen: boolean;  // Modal open status
    setIsOpen: (isOpen: boolean) => void; // Function to toggle modal
}
const ReactModal = ({ children, modalIsOpen, setIsOpen }: ModalProps) => {
   

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className='bg-gra'>
          
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="relative p-2">
                    <button onClick={closeModal} className='absolute -top-4 -right-4 hover:text-color-s text-black text-3xl bg-transparent'>
                        <MdOutlineCancel />
                    </button>
                    {children}
                </div>
            </Modal>
        </div>
    );
};

export default ReactModal;
