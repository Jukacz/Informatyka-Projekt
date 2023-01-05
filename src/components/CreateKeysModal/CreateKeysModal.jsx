import "./CreateKeysModal.scss"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../Loader/Loader"
import TransitionAnimate from "../Transition/TransitionAnimate"
import CopyTextButton from "../CopyTextButton/CopyTextButton"
const CreateKeysModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ready, setReady] = useState(false)
    const [keys, setKeys] = useState({ publicKey: "", privateKey: "" })
    const { publicKey, privateKey } = keys

    useEffect(() => {
        const fetchData = async () => {
            const getProfile = await axios.get("/generate-keys").catch(err => err.response)
            if (getProfile.status === 200) {
                const { data } = getProfile
                setKeys({
                    publicKey: data.public_key,
                    privateKey: data.private_key
                })
            }
            setReady(true)
        }
        if (isOpen) fetchData()
        else {
            setKeys({ publicKey: "", privateKey: "" })
            setReady(false)
        }
    }, [isOpen])
    return (
        <>
            <div onClick={onOpen}>{children}</div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <div className="CreateKeysModal-container">
                        <ModalHeader>Generowanie Kluczy</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody className="modal-body">
                            <AnimatePresence mode="wait">
                                <TransitionAnimate key={ready}>
                                    {ready ?
                                        <>
                                            <h5>Twoje Klucze to:</h5>
                                            <div className="box-with-keys">
                                                <h6>Publiczny Klucz</h6>
                                                <div>
                                                    <CopyTextButton value={publicKey} />
                                                    <p>{publicKey}</p>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <Loader />
                                    }
                                </TransitionAnimate>
                            </AnimatePresence>
                        </ModalBody>
                        <ModalFooter>
                            <button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </button>
                            <button variant='ghost'>Secondary Action</button>
                        </ModalFooter>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateKeysModal