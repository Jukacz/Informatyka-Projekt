import "./CreateKeysModal.scss";
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
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import TransitionAnimate from "../Transition/TransitionAnimate";
import CopyTextButton from "../CopyTextButton/CopyTextButton";
const CreateKeysModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ready, setReady] = useState(false);
  const [keys, setKeys] = useState({ publicKey: "", privateKey: "" });
  const { publicKey, privateKey } = keys;
  const fetchData = async () => {
    const getProfile = await axios
      .get("/generate-keys")
      .catch((err) => err.response);
    if (getProfile.status === 200) {
      const { data } = getProfile;
      setKeys({
        publicKey: data.public_key,
        privateKey: data.private_key,
      });
    }
    setReady(true);
  };

  useEffect(() => {
    if (isOpen) fetchData();
    else {
      setKeys({ publicKey: "", privateKey: "" });
      setReady(false);
    }
  }, [isOpen]);

  const generateAgain = () => {
    setKeys({ publicKey: "", privateKey: "" });
    setReady(false);
    fetchData();
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <div className="CreateKeysModal-container">
            <ModalHeader>Generowanie Kluczy</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="modal-body">
              <AnimatePresence mode="wait">
                <TransitionAnimate key={ready}>
                  {ready ? (
                    <>
                      <h5>Twoje Klucze to:</h5>
                      <div className="flex-box-div">
                        <div className="box-with-keys">
                          <h6>Publiczny Klucz</h6>
                          <div>
                            <CopyTextButton value={publicKey} />
                            <p>{publicKey}</p>
                          </div>
                        </div>
                        <div className="box-with-keys">
                          <h6>Prywatny Klucz</h6>
                          <div>
                            <CopyTextButton value={privateKey} />
                            <p>{privateKey}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Loader />
                  )}
                </TransitionAnimate>
              </AnimatePresence>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <button className="button-footer" onClick={onClose}>
                Close
              </button>
              <button className="button-footer" onClick={() => generateAgain()}>
                Wygeneruj Ponownie!
              </button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateKeysModal;
