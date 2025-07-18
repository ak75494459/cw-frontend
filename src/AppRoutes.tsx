import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { MyCarousel } from "./components/Carousel";
import VideoMenuSlab from "./components/VideoMenuSlab";
import AuthCallbackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateProductPage from "./pages/CreateProductsPages";
import { useGetMyUser } from "./api/MyUserApi";
import ProductsPage from "./pages/ProductsPage";
import ProductsPaginationPage from "./pages/ProductsPaginationPage";
import ProductMainPage from "./pages/ProductMainPage";
import CartPage from "./pages/CartPage";
import CartLayout from "./layouts/CartLayout";
import ProductsLayout from "./layouts/ProductsLayout";
import About from "./components/About";
import QueryPage from "./pages/QueryPage";
import WithoutFooterLayout from "./layouts/WithoutFooterLayout";
import Faq from "./components/Faq";
import Support from "./components/Support";
import ProductsCollectionPage from "./pages/ProductsCollectionPage";
import VideoWithProducts from "./components/VideoWithProducts";
import Collections from "./components/Collections";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import ReturnPolicy from "./components/ReturnPolicy";
import OrderPage from "./pages/OrderPage";
import ShippingPolicy from "./components/ShippingPolicy";

const AppRoutes = () => {
  const { currentUser } = useGetMyUser();
  const targetId = import.meta.env.VITE_TARGET_ID;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeLayout>
            <VideoMenuSlab />
            <MyCarousel />
            <Collections />
            <ProductsPage />
            <VideoWithProducts />
          </HomeLayout>
        }
      />
      <Route
        path="/products"
        element={
          <ProductsLayout>
            <ProductsPaginationPage />
          </ProductsLayout>
        }
      />
      <Route
        path="/about"
        element={
          <ProductsLayout>
            <About />
          </ProductsLayout>
        }
      />

      <Route
        path={`/products/:id`}
        element={
          <ProductsLayout>
            <ProductMainPage />
          </ProductsLayout>
        }
      />
      <Route
        path={`/products/collections/:collectionName`}
        element={
          <ProductsLayout>
            <ProductsCollectionPage />
          </ProductsLayout>
        }
      />

      <Route
        path="/faq"
        element={
          <WithoutFooterLayout>
            <Faq />
          </WithoutFooterLayout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <ProductsLayout>
            <PrivacyPolicy />
          </ProductsLayout>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <ProductsLayout>
            <TermsOfService />
          </ProductsLayout>
        }
      />
      <Route
        path="/shipping-policy"
        element={
          <ProductsLayout>
            <ShippingPolicy />
          </ProductsLayout>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <ProductsLayout>
            <TermsOfService />
          </ProductsLayout>
        }
      />
      <Route
        path="/return-policy"
        element={
          <ProductsLayout>
            <ReturnPolicy />
          </ProductsLayout>
        }
      />

      <Route
        path="/support"
        element={
          <WithoutFooterLayout>
            <Support />
          </WithoutFooterLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <WithoutFooterLayout>
            <QueryPage />
          </WithoutFooterLayout>
        }
      />

      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <WithoutFooterLayout>
              <UserProfilePage />
            </WithoutFooterLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <CartLayout>
              <CartPage />
            </CartLayout>
          }
        />
        <Route
          path="/order"
          element={
            <ProductsLayout>
              <OrderPage />
            </ProductsLayout>
          }
        />

        {currentUser?._id === targetId ? (
          <Route
            path="/add-products"
            element={
              <Layout>
                <CreateProductPage />
              </Layout>
            }
          />
        ) : null}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
