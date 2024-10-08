
import Modal from 'react-modal';
import { MdOutlineCancel } from "react-icons/md";
import { ReactNode } from 'react';

const customStyles = {
    overlay: {
                zIndex: '900',
                backgroundColor: '100f0f',
                
            },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding:'0px',
        zIndex:'999',
        maxWidth: '90%',
        minWidth: '300px',
    },
};
interface ModalProps {
    children: ReactNode;
    modalIsOpen: boolean;  
    setIsOpen: (isOpen: boolean) => void; 
    label?:string;
}
const ReactModal = ({ children, modalIsOpen, setIsOpen,label }: ModalProps) => {
   
// example state 
// const [modalIsOpen,setIsOpen]=useState(false)

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className=''>
          
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={label||"Example Modal"}
            >
                <div className="relative    bg-[#100f0f] ">
                    <button onClick={closeModal} className=' bg-gray-900 bg-opacity-50 rounded-full  absolute top-4 right-4 hover:text-color-s text-white text-3xl bg-transparent'>
                        <MdOutlineCancel />
                    </button>
                    {children}
                </div>
            </Modal>
        </div>
    );
};

export default ReactModal;


// const customStyles = {
//     overlay: {
//         zIndex: '50',
//         backgroundColor: '100f0f',
        
//     },
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         padding:'0px',
//         // marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         // width: '90%',
//         maxWidth: '90%',
//         // minWidth: '80%',
//         height: 'auto',
//         maxHeight: '90vh',
//         // overflow: 'auto',
//         position: 'relative',
//         margin: '10px',
    
//     },
// };
