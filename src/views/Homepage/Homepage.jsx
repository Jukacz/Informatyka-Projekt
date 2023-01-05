import CreateKeysModal from "../../components/CreateKeysModal/CreateKeysModal"
import "./Homepage.scss"

const Homepage = () => {
    return (
        <div className="homepage-container">
            <CreateKeysModal>
                <div className="create-keys-box box">Utwórz Klucze</div>
            </CreateKeysModal>
            <div className="import-public-keys box">Importowanie Kluczy Publicznych</div>
            <div className="sign-file box">Podpisz Plik</div>
            <div className="verify-sign-of-file box">Zweryfikuj Podpis Pliku</div>
        </div>
    )
}
export default Homepage