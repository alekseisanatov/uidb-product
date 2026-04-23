import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./components/Header";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
};
