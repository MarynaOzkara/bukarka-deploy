import { BooksContextProvider } from "components/Book";
import { OrderContextProvider } from "components/Order/OrderContext";
import OrderConfirmationPage from "pages/OrderConfirmationPage";
import OrderPage from "pages/OrderPage/OrderPage";
import PaymentPage from "pages/PaymentPage";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import combineProviders from "utils/combineProviders";
import Layout from "components/Layout/Layout";
import { FavoritesProvider } from "components/Favorites/FavoritesContext";
import { clearLocalStorage } from "utils/clearLocalStorage";

const HomePage = lazy(() => import("pages/HomePage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const AboutPage = lazy(() => import("pages/AboutPage"));
const DeliveryPage = lazy(() => import("pages/DeliveryPage"));
const ContactsPage = lazy(() => import("pages/ContactsPage"));
const CatalogPage = lazy(() => import("pages/CatalogPage"));
const BookClubPage = lazy(() => import("pages/BookClubPage"));
const PrivacyPolicyPage = lazy(() => import("pages/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("pages/TermsOfUsePage"));
const BookPage = lazy(() => import("pages/BookPage"));
const FavoritePage = lazy(() => import("pages/FavoritePage"));
const SearchPage = lazy(() => import("pages/SearchPage"));
const SectionContent = lazy(() => import("pages/CatalogPage/SectionContent"));

const Providers = combineProviders(
  BooksContextProvider,
  OrderContextProvider,
  FavoritesProvider
);

function App() {
  useEffect(() => {
    clearLocalStorage();
  }, []);

  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="books/:id" element={<BookPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="club" element={<BookClubPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsOfUsePage />} />
          <Route path="catalog" element={<CatalogPage />}>
            <Route index element={<SectionContent />} />
            <Route path=":category" element={<SectionContent />} />
            <Route path=":category/:subcategory" element={<SectionContent />} />
            <Route
              path=":category/:subcategory/:link"
              element={<SectionContent />}
            />
          </Route>
          <Route path="order/:id" element={<OrderPage />} />
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="favorites" element={<FavoritePage />} />
          <Route path="search" element={<SearchPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Providers>
  );
}

export default App;
