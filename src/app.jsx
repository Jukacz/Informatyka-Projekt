import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Homepage } from './views';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ChakraProvider>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                    </Routes>
                </ChakraProvider>
            </BrowserRouter>
        </>
    )
}

export default App;
