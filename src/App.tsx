import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./component/Product/ProductListing";
import SignInPage from "./Page/SignIn";
import SignUpPage from "./Page/SignUp";
import { AuthProvider } from "./component/auth/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
