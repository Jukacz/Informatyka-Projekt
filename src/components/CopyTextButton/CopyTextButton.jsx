import { useState } from "react"
import "./CopyTextButton.scss"

const CopyTextButton = ({ value }) => {
    const [coppied, setCoppied] = useState(false)

    const copyText = () => {
        navigator.clipboard.writeText(value);
        setCoppied(true)
    }

    return <button disabled={coppied} onClick={() => copyText()} className="copy-text-button">{coppied ? "Tekst Skopiowany" : "Kopiuj"}</button>
}

export default CopyTextButton