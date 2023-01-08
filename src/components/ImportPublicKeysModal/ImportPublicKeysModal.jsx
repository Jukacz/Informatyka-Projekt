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
import { useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const ImportPublicKeysModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState(false);
  const publicKeyString = useRef();
  const toast = useToast({ duration: 3000, isClosable: true });
  const import_keys = async () => {
    const fetch_keys = await axios
      .post("/import-keys", {
        public_key: publicKeyString.current.value,
      })
      .catch((err) => err.response);

    if (fetch_keys.status === 200) {
      setResult(true);
      return;
    }
    toast({ title: "nie podales prawidlowego kluzca", status: "error" });
  };

  return (
    <>
      <button onClick={onOpen}>{children}</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
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
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </button>
            <button variant="ghost" onClick={() => import_keys()}>
              Secondary Action
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImportPublicKeysModal;
