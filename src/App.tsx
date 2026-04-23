import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./components/Header";

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/devices" replace />}
                    />
                    <Route path="/devices" element={<HomePage />} />
                    <Route path="/devices/:id" element={<ProductPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};
