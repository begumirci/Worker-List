import './CustomForm.css';

export default function ErrorModal({error,closeModal}){
    

    return(
        <div onClick={closeModal} className="modal">
            <div className="modal-body">
                <h2  className="modalHeader">{error}</h2>
                <button onClick={closeModal} className="modalBtn">Tamam</button>
            </div>
        </div>
    )
}