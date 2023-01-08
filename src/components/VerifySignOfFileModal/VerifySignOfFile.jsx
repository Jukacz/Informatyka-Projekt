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
const VerifySignOfFile = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>{children}</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Its new modal</p>
          </ModalBody>

          <ModalFooter>
            <button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </button>
            <button variant="ghost">Secondary Action</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifySignOfFile;
