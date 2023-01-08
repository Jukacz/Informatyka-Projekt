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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const SignFileModal = ({ children }) => {
  const fileRef = useRef();
  const private_key_ref = useRef();
  const [link, setLink] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sendFile = async (e) => {
    e.preventDefault();
    const filesend = await axios
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
      setLink(filesend.data)
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLink("");
    }
  }, [isOpen])
  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={sendFile}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!link ? (
            <div className="sing-file-body-div">
            <p>Podaj swój prywatny klucz</p>
            <textarea ref={private_key_ref} />
            <p>Plik do Zapisania</p>
            <input type="file" ref={fileRef} />
            </div>
            ) : (
              <div className="link-to-download-div">
                <p>Link do pobrania pliku</p>
                <a download href={link} className="link-to-download">{link}</a>
              </div>
            )}
          </ModalBody>

          <ModalFooter className="modal-footer">
            <button type="button" onClick={onClose}>
              Close
            </button>
            <button type="submit">
              Secondary Action
            </button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignFileModal;
