import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./user.scss";

const ModalDelete = (props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        // search: modal proptypes
        show={props.show}
        onHide={props.handleClose}
        animation={true}
        centered
        className="modal-delete"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>CONFIRM DELETE USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, are you sure delete this user: {props.dataModal.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDelete;
