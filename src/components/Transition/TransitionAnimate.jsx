import { AnimatePresence, motion } from "framer-motion"

const TransitionAnimate = ({ children, key }) => {
    const animationConfiguration = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <motion.div
            key={key}
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    )
}

export default TransitionAnimate