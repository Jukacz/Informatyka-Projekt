import "./VerifySignOfFile.scss";
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
const VerifySignOfFile = ({ children }) => {
  const public_keyRef = useRef();
  const fileRef = useRef();
  const originalFile = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetch = async (e) => {
    e.preventDefault();
    const public_key = public_keyRef.current.value;
    const response = await axios.post("http://127.0.0.1:5000/verify", {
      public_key: public_keyRef.current.value,
      signature_file: fileRef.current.files[0],
      original_file: originalFile.current.files[0],
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })}
  return (
    <>
      <button onClick={onOpen}>{children}</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={fetch}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Public Key</p>
            <textarea ref={public_keyRef}></textarea>
            <p>Plik Signed</p>
            <input type="file" ref={fileRef}/>
            <p>Plik Orgyginany</p>
            <input type="file" ref={originalFile} />
          </ModalBody>

          <ModalFooter>
            <button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </button>
            <button variant="ghost">Secondary Action</button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifySignOfFile;
