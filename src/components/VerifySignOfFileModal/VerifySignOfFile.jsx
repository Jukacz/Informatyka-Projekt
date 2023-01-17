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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const VerifySignOfFile = ({ children }) => {
  const public_keyRef = useRef();
  const fileRef = useRef();
  const toast = useToast({ duration: 3000, isClosable: true });
  const originalFile = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState("");
  const fetch = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(
        "http://127.0.0.1:5000/verify",
        {
          public_key: public_keyRef.current.value,
          signature_file: fileRef.current.files[0],
          original_file: originalFile.current.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => err.response);
    if (response.status === 200 && response.data.status === "success") {
      setResult(response.data.data);
    }
    toast({ title: response.data.data, status: "error" });
  };

  return (
    <>
      <button onClick={onOpen}>{children}</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="modal-content-div">
          <form onSubmit={fetch}>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {result ? (
                <h1 className="result-h1">{result}</h1>
              ) : (
                <div className="form-div">
                  <p>Public Key</p>
                  <textarea ref={public_keyRef}></textarea>
                  <p>Plik Signed</p>
                  <input type="file" ref={fileRef} />
                  <p>Plik Orgyginany</p>
                  <input type="file" ref={originalFile} />
                </div>
              )}
            </ModalBody>

            <ModalFooter className="modal-footer">
              <button onClick={onClose}>Close</button>
              <button variant="ghost">Secondary Action</button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifySignOfFile;
