import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Navbar_Admin from "@/components/Navbar/Navbar_Admin";
import Sidebar from "@/components/Sidebar/Sidebar";
import ActivitiesPage from "@/pages/public/ActivitiesPage";
import EducationPage from "@/pages/public/EducationPage";
import UsersPage from "@/pages/auth/Users/UsersPage";
import DashboardPage from "@/pages/web/DashboardPage";
import ProdukSampahPage from "@/pages/web/ProdukSampahPage";
import KategoriSampahPage from "@/pages/web/KategoriSampahPage";
import TransaksiPage from "@/pages/web/TransaksiPage";
import PenggunaPage from "@/pages/web/PenggunaPage";
import ManagementPage from "@/pages/web/ManagementPage";
import DatabaseManagement from "@/pages/public/DatabaseManagement/DatabaseManagement";
import CreateDatabasePage from "@/pages/public/DatabaseManagement/CreateDatabasePage";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/public/Home/HomePage";
// import Footer from "@/components/Footer/Footer";
import PatnersPage from "@/pages/public/PatnersPage";
import AboutPage from "@/pages/public/AboutPage";
import Guide from "@/pages/public/Guide";
import LoginPage from "@/pages/public/Login/LoginPage";
import UOMPage from "@/pages/web/UOMPage";

function App() {
  const location = useLocation();

  // Define the routes for landing page and admin
  const landingRoutes = [
    "/",
    "/patners",
    "/activities",
    "/education",
    "/AboutUs",
    "/Guide",
    "/Login",
  ];
  const adminRoutes = [
    "/web/res_users",
    "/web/database/create",
    "/web",
    "/web/produk-sampah",
    "/web/kategori-sampah",
    "/web/transaksi",
    "/web/uom",
    "/web/pengguna",
    "/web/management",
    "/web/database/manager",
  ];

  // Check the current route
  const isLandingPage = landingRoutes.includes(location.pathname);
  const isAdminPage = adminRoutes.includes(location.pathname);

  return (
    <div className="h-screen flex flex-col">
      {/* Show Navbar if on Landing Page */}
      {isLandingPage && <Navbar />}

      {/* Admin Layout */}
      {isAdminPage && (
        <>
          {/* Navbar Admin */}
          {/* <Navbar_Admin className="w-full bg-gray-800 text-white z-50" /> */}
          <Navbar_Admin className="header fixed-top d-flex align-items-center" />

          <div className="flex-1 flex mt-16">
            {/* Sidebar */}
            <Sidebar className="w-64 bg-gray-900 text-white h-full fixed top-16 left-0 z-40" />

            {/* Content */}
            <div className="flex-1 ml-64 p-6 bg-gray-100">
              {/* Routes */}
              <Routes>
                {/* Route Admin */}
                <Route
                  path="/web/database/create"
                  element={<CreateDatabasePage />}
                />
                <Route path="/web" element={<DashboardPage />} />
                <Route
                  path="/web/produk-sampah"
                  element={<ProdukSampahPage />}
                />
                <Route
                  path="/web/kategori-sampah"
                  element={<KategoriSampahPage />}
                />
                <Route path="/web/uom" element={<UOMPage />} />
                <Route path="/web/transaksi" element={<TransaksiPage />} />
                <Route path="/web/management" element={<ManagementPage />} />
                <Route path="/web/res_users" element={<UsersPage />} />
                <Route path="/web/pengguna" element={<PenggunaPage />} />
                <Route
                  path="/web/database/manager"
                  element={<DatabaseManagement />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}

      {/* Landing Page Layout */}
      {isLandingPage && (
        <>
          <div className="flex-1">
            <Routes>
              {/* Route Landing Page */}
              <Route path="/" element={<HomePage />} />
              <Route path="/patners" element={<PatnersPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/AboutUs" element={<AboutPage />} />
              <Route path="/Guide" element={<Guide />} />
              <Route path="/Login" element={<LoginPage />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
}

export default App;
