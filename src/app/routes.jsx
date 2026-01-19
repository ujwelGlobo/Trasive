import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import AppLayout from "../layout/AppLayout";
import LoginLayout from "../layout/LoginLayout";

/* Auth */
import Login from "../pages/Login/Login";

/* Pages */
import DashLandingPage from "../pages/dashboard/dashLandingPage/DashLandingPage";
import LandingPage from "../pages/home/landingPage/LandingPage";

/* Query */
import QueryList from "../pages/query/queryList/queryList";
import QueryView from "../pages/query/QueryView/QueryView";

/* Itineraries */
import Itinerarieslanding from "../pages/itineraries/itineraries/Itinerarieslanding";

/* Clients & Suppliers */
import ClientsList from "../pages/clients/ClientsList";
import SuppliersList from "../pages/suppliers/SuppliersList";

/* Reports */
import ReportsHome from "../pages/reports/ReportsHome/ReportsHome";
import AttendanceReport from "../pages/reports/AttendanceReport/AttendanceReport";
import NotesReport from "../pages/reports/NotesReport/NotesReport";
import CollectionReport from "../pages/reports/CollectionReport/CollectionReport";
import ToursReport from "../pages/reports/ToursReport/ToursReport";
import TasksReport from "../pages/reports/TasksReport/TasksReport";
import MISReport from "../pages/reports/MISReport/MISReport";
import LedgerReport from "../pages/reports/LedgerReport/LedgerReport";
import TransportReport from "../pages/reports/TransportReport/TransportReport";

/* Master */
import MasterHome from "../pages/master/MasterHome/MasterHome";
import Destination from "../pages/master/Destination/Destination";
import Activity from "../pages/master/Activity/Activity";
import Sightseeing from "../pages/master/Sightseeing/Sightseeing";
import Hotel from "../pages/master/Hotel/Hotel";
import RoomType from "../pages/master/RoomType/RoomType";
import MealPlan from "../pages/master/MealPlan/MealPlan";
import Vehicle from "../pages/master/Vehicle/Vehicle";
import VehicleCategory from "../pages/master/VehicleCategory/VehicleCategory";
import PickupDrop from "../pages/master/PickupDrop/PickupDrop";
import Currency from "../pages/master/Currency/Currency";
import LeadSource from "../pages/master/LeadSource/LeadSource";
import ManualVoucher from "../pages/master/ManualVoucher/ManualVoucher";
import Flight from "../pages/master/Flight/Flight";
import Addons from "../pages/master/Addons/Addons";
import Wallpaper from "../pages/master/Wallpaper/Wallpaper";
import MasterAccountDetails from "../pages/master/MasterAccountDetails/MasterAccountDetails";

/* Marketing */
import MarketingDashboard from "../pages/marketing/MarketingDashBoard/MarketingDashBoard";
import ClientsGroup from "../pages/marketing/ClientsGroup/ClientsGroup";
import EmailTemplates from "../pages/marketing/EmailTemplates/EmailTemplates";
import Campaigns from "../pages/marketing/Campaigns/Campaigns";
import LandingPages from "../pages/marketing/LandingPages/LandingPages";

/* Settings */
import SettingsLayout from "../pages/settings/SettingsLayout/SettingsLayout";
import MyProfile from "../pages/settings/MyProfile/MyProfile";
import Organisation from "../pages/settings/Organisation/Organisation";
import DefaultSetting from "../pages/settings/DefaultSetting/DefaultSetting";
import SettingsDestinations from "../pages/settings/SettingsDestinations/SettingsDestinations";
import SettingsAccountDetails from "../pages/settings/SettingsAccountDetails/SettingsAccountDetails";
import MailSetting from "../pages/settings/MailSetting/MailSetting";

import AuthGuard from "./AuthGuard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC / AUTH */}
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* APP */}
        <Route element={<AuthGuard><AppLayout /></AuthGuard>}>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashLandingPage />} />
          <Route path="/home" element={<LandingPage />} />

          <Route path="/query" element={<QueryList />} />
          <Route path="/query/:id" element={<QueryView />} />

          <Route path="/itineraries" element={<Itinerarieslanding />} />

          <Route path="/clients" element={<ClientsList />} />
          <Route path="/suppliers" element={<SuppliersList />} />

          <Route path="/reports" element={<ReportsHome />} />
          <Route path="/reports/attendance" element={<AttendanceReport />} />
          <Route path="/reports/notes" element={<NotesReport />} />
          <Route path="/reports/collection" element={<CollectionReport />} />
          <Route path="/reports/tours" element={<ToursReport />} />
          <Route path="/reports/tasks" element={<TasksReport />} />
          <Route path="/reports/mis" element={<MISReport />} />
          <Route path="/reports/ledger" element={<LedgerReport />} />
          <Route path="/reports/transport" element={<TransportReport />} />

          <Route path="/master" element={<MasterHome />} />
          <Route path="/master/destination" element={<Destination />} />
          <Route path="/master/activity" element={<Activity />} />
          <Route path="/master/sightseeing" element={<Sightseeing />} />
          <Route path="/master/hotel" element={<Hotel />} />
          <Route path="/master/room-type" element={<RoomType />} />
          <Route path="/master/meal-plan" element={<MealPlan />} />
          <Route path="/master/vehicle" element={<Vehicle />} />
          <Route path="/master/vehicle-category" element={<VehicleCategory />} />
          <Route path="/master/pickup-drop" element={<PickupDrop />} />
          <Route path="/master/currency" element={<Currency />} />
          <Route path="/master/lead-source" element={<LeadSource />} />
          <Route path="/master/manual-voucher" element={<ManualVoucher />} />
          <Route path="/master/flight" element={<Flight />} />
          <Route path="/master/addons" element={<Addons />} />
          <Route path="/master/wallpaper" element={<Wallpaper />} />
          <Route path="/master/account-details" element={<MasterAccountDetails />} />

          <Route path="/marketing" element={<MarketingDashboard />} />
          <Route path="/marketing/clients-group" element={<ClientsGroup />} />
          <Route path="/marketing/email-templates" element={<EmailTemplates />} />
          <Route path="/marketing/campaigns" element={<Campaigns />} />
          <Route path="/marketing/landing-pages" element={<LandingPages />} />

          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<MyProfile />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="organisation" element={<Organisation />} />
            <Route path="default-setting" element={<DefaultSetting />} />
            <Route path="destinations" element={<SettingsDestinations />} />
            <Route path="account-details" element={<SettingsAccountDetails />} />
            <Route path="mail-setting" element={<MailSetting />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
