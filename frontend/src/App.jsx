import ImportPage from "./components/ImportPage.jsx";
import {Routes, Route} from "react-router-dom";
import TransactionsPage from "./components/TransactionsPage.jsx"

export default function App() {
  return <Routes>
    <Route path="/" element={<ImportPage/>}/>
    <Route path="/transactions" element={<TransactionsPage/>} />
  </Routes>
}