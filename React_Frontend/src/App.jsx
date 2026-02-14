import { BrowserRouter , Routes, Route} from "react-router-dom"
import { Signup } from "./components/Signup"
import { Login } from "./components/Login"
import { Products } from "./components/Products"
import ProtectedRoute from "./components/ProtectedRoute"

const App=()=>{


  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      } />
    </Routes>
    </BrowserRouter>
  )

}
export default App;