import "./ImportPublicKeysModal.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const ImportPublicKeysModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState(false);
  const publicKeyString = useRef();
  const toast = useToast({ duration: 3000, isClosable: true });
  const import_keys = async (e) => {
    e.preventDefault();
    const fetch_keys = await axios
      .post("/import-keys", {
        public_key: publicKeyString.current.value,
      })
      .catch((err) => err.response);

    if (fetch_keys.status === 200) {
      setResult(true);
      return;
    }
    toast({ title: fetch_keys.data.data, status: "error" });
  };
  useEffect(() => {
    if (isOpen) {
      setResult(false);
    }
  }, [isOpen]);
  return (
    <>
      <button onClick={onOpen}>{children}</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={import_keys}>
            <ModalHeader>Importuj Klucze</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {!result ? (
                <div className="input-group">
                  <p>Podaj Klucz Publiczny: </p>
                  <textarea type="text" ref={publicKeyString}></textarea>
                </div>
              ) : (
                <div className="success-div">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <h5>Udało sie zaimportować</h5>
                  <p>
                    Niewiedzialem co z tym faktem zrobic, wiec pozostawiam tą
                    infomacje {":)"}
                  </p>
                </div>
              )}
            </ModalBody>

            <ModalFooter className="modal-footer">
              <button onClick={onClose} type="button">
                Close
              </button>
              <button variant="ghost" type="submit">
                Importuj
              </button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImportPublicKeysModal;
