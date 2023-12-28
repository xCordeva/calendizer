import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "@/css/ConfirmDelete.css";

const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="confrim-delete">
      <div className="confrim-delete-popup">
        <h2>Are you sure you want to delete this?</h2>
        <p>This action can't be undone</p>
        <div>
          <button className="events-button yes-button" onClick={onConfirm}>
            Yes
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="events-button no-button" onClick={onCancel}>
            No
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
