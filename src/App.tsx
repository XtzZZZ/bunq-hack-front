import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import BillPage from "./pages/BillPage.tsx";
import CreateBillPage from "./pages/CreateBillPage.tsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/bills/:id" element={<BillPage />}/>
                <Route path="/bills" element={<CreateBillPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App