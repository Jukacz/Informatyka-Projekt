import "./SignFileModal.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";
const SignFileModal = ({ children }) => {
  const fileRef = useRef();
  const private_key_ref = useRef();
  const sendFile = async () => {
    const filesend = axios
      .post(
        "/sign",
        {
          private_key: private_key_ref.current.value,
          file: fileRef.current.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => err.response);

    if (filesend.status === 200) {
      console.log(filesend.data);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Podaj swój prywatny klucz</p>
            <textarea ref={private_key_ref} />
            <p>Plik do Zapisania</p>
            <input type="file" ref={fileRef} />
          </ModalBody>

          <ModalFooter>
            <button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </button>
            <button variant="ghost" onClick={() => sendFile()}>
              Secondary Action
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignFileModal;
