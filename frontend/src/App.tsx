import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import OrderPage from "pages/OrderPage/OrderPage";
import PaymentPage from "pages/PaymentPage";
import { OrderContextProvider } from "components/Order/OrderContext";
import OrderConfirmationPage from "pages/OrderConfirmationPage";
const HomePage = lazy(() => import("pages/HomePage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage/NotFoundPage"));
const AboutPage = lazy(() => import("pages/AboutPage/AboutPage"));
const DeliveryPage = lazy(() => import("pages/DeliveryPage/DeliveryPage"));
const ContactsPage = lazy(() => import("pages/ContactsPage/ContactsPage"));
const CatalogPage = lazy(() => import("pages/CatalogPage"));
const BookClubPage = lazy(() => import("pages/BookClubPage/BookClubPage"));
const PrivacyPolicyPage = lazy(() => import("pages/PrivacyPolicyPage"));
const BookPage = lazy(() => import("pages/BookPage"));

function App() {
  return (
    <OrderContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="books/:id" element={<BookPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="club" element={<BookClubPage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="order/:id" element={<OrderPage />} />
            <Route path="payment/:id" element={<PaymentPage />} />
            <Route path="confirmation/:id" element={<OrderConfirmationPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </OrderContextProvider>
  );
}

export default App;
