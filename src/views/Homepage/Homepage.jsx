import CreateKeysModal from "../../components/CreateKeysModal/CreateKeysModal";
import {
  ImportPublicKeysModal,
  SignFileModal,
  VerifySignOfFile,
} from "../../components";
import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <CreateKeysModal>
        <div className="create-keys-box box">Utwórz Klucze</div>
      </CreateKeysModal>
      <ImportPublicKeysModal>
        <div className="import-public-keys box">
          Importowanie Kluczy Publicznych
        </div>
      </ImportPublicKeysModal>
      <SignFileModal>
        <div className="sign-file box">Podpisz Plik</div>
      </SignFileModal>
      <VerifySignOfFile>
        <div className="verify-sign-of-file box">Zweryfikuj Podpis Pliku</div>
      </VerifySignOfFile>
    </div>
  );
};
export default Homepage;
