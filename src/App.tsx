import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import BillPage from "./pages/BillPage.tsx";
import CreateBillPage from "./pages/CreateBillPage.tsx";
import SharedPage from "./pages/SharedPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/bills/:id" element={<BillPage />}/>
                <Route path="/bills" element={<CreateBillPage/>}/>
                <Route path="/shared/:code" element={<SharedPage/>}/>
                <Route path="/payment" element={<PaymentPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App