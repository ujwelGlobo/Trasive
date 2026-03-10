import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthGuard from "@/app/AuthGuard";
import { ROLES } from "@/utils/constants/constants";

/* Layouts */
import AppLayout from "@/layout/AppLayout";
import LoginLayout from "@/layout/LoginLayout";

/* Auth */
import Login from "@/features/auth/Login/Login";
import Registration from "@/features/auth/Registration/Registration";

/* Dashboard */
import DashLandingPage from "@/features/dashboard/Page/DashLandingPage";

/* Operations */
import ArrivalsToday from "@/features/operations/ArrivalsToday/pages/ArrivalsToday";
import DeparturesToday from "@/features/operations/DeparturesToday/pages/DeparturesToday";
import FollowUp from "@/features/operations/FollowUp/pages/FollowUp";
import OngoingGuests from "@/features/operations/OngoingGuests/pages/OngoingGuests";
import WeekArrival from "@/features/operations/WeekArrivel/pages/WeekArrivel";
import GuestMovement from "@/features/operations/GuestMovement/pages/GuestMovement";
import Sales from "@/features/operations/Sales/pages/Sales";
import SupplierPayment from "@/features/operations/SupplierPayment/pages/SupplierPayment";
import TodayPaymentCollection from "@/features/operations/TodayPaymentCollection/pages/TodayPaymentCollection";
import Transportation from "@/features/operations/Transportation/pages/Transportation";

/* Query */
/* Query */
import QueryList from "@/features/query/QueryList/pages/queryList/QueryList";
import QueryView from "@/features/query/QueryList/pages/QueryView/QueryView";

/* Itineraries */
import Itineraries from "@/features/itineraries/pages/ItinerariesList";
import ItineraryDetails from "@/features/itineraries/pages/Details/ItineraryDetails";

/* Clients & Suppliers */
import ClientsList from "@/features/clients/pages/ClientsList";
import SuppliersList from "@/features/suppliers/pages/SuppliersList";

/* Reports */
import ReportsHome from "@/features/reports/ReportsHome/pages/ReportsHome";
import AttendanceReport from "@/features/reports/AttendanceReport/pages/AttendanceReport";
import NotesReport from "@/features/reports/NotesReport/pages/NotesReport";
import CollectionReport from "@/features/reports/CollectionReport/pages/CollectionReport";
import ToursReport from "@/features/reports/ToursReport/pages/ToursReport";
import TasksReport from "@/features/reports/TasksReport/pages/TasksReport";
import MISReport from "@/features/reports/MISReport/pages/MISReport";
import LedgerReport from "@/features/reports/LedgerReport/pages/LedgerReport";
import TransportReport from "@/features/reports/TransportReport/pages/TransportReport";

/* Master */
import MasterHome from "@/features/master/MasterHome/pages/MasterHome";
import Destination from "@/features/master/Destination/pages/Destination";
import Activity from "@/features/master/Activity/pages/Activity";
import Sightseeing from "@/features/master/Sightseeing/pages/Sightseeing";
import Hotel from "@/features/master/Hotel/pages/Hotel";
import RoomType from "@/features/master/RoomType/pages/RoomType";
import MealPlan from "@/features/master/MealPlan/pages/MealPlan";
import Vehicle from "@/features/master/Vehicle/pages/Vehicle";
import VehicleCategory from "@/features/master/VehicleCategory/pages/VehicleCategory";
import PickupDrop from "@/features/master/PickupDrop/pages/PickupDrop";
import Currency from "@/features/master/Currency/pages/Currency";
import LeadSource from "@/features/master/LeadSource/pages/LeadSource";
import ManualVoucher from "@/features/master/ManualVoucher/pages/ManualVoucher";
import Flight from "@/features/master/Flight/pages/Flight";
import Addons from "@/features/master/Addons/pages/Addons";
import Wallpaper from "@/features/master/Wallpaper/pages/Wallpaper";
import MasterAccountDetails from "@/features/master/MasterAccountDetails/pages/MasterAccountDetails";
import InclusionExclusion from "@/features/master/InclusionExclusion/pages/InclusionExclusion";

/* Marketing */
import MarketingDashboard from "@/features/marketing/MarketingDashBoard/pages/MarketingDashboard";
import ClientsGroup from "@/features/marketing/ClientsGroup/pages/ClientsGroup";
import EmailTemplates from "@/features/marketing/EmailTemplates/pages/EmailTemplates";
import EmailTemplateForm from "@/features/marketing/EmailTemplates/pages/EmailTemplateForm";
import Campaigns from "@/features/marketing/Campaigns/pages/Campaigns";
import LandingPages from "@/features/marketing/LandingPages/pages/LandingPages";
import LandingForm from "@/features/marketing/LandingPages/pages/LandingForm";

/* Settings */
import SettingsLayout from "@/features/settings/SettingsLayout/pages/SettingsLayout";
import MyProfile from "@/features/settings/MyProfile/pages/MyProfile";
import Organisation from "@/features/settings/Organisation/pages/Organisation";
import DefaultSetting from "@/features/settings/DefaultSetting/pages/DefaultSetting";
import SettingsDestinations from "@/features/settings/SettingsDestinations/pages/SettingsDestinations";
import SettingsAccountDetails from "@/features/settings/SettingsAccountDetails/pages/SettingsAccountDetails";
import MailSetting from "@/features/settings/MailSetting/pages/MailSetting";
import Team from "@/features/settings/Team/pages/Team";

/* Emails */
import EmailInbox from "@/features/email/pages/EmailInbox";
import EmailView from "@/features/email/pages/EmailView";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC / AUTH */}
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route
          element={
            <AuthGuard
              // allowedRoles={[
              //   ROLES.EMPLOYEE,
              //   ROLES.COMPANY_ADMIN,
              // ]}
            />
          }
        >
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashLandingPage />} />
            <Route path="/query" element={<QueryList />} />
            <Route path="/query/:id" element={<QueryView />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/itineraries/:id/*" element={<ItineraryDetails />} />
             <Route path="/settings/team" element={<Team/>}/>
          </Route>
        </Route>

        {/* APP ( AUTH GUARD) */}
        <Route element={<AuthGuard 
        // allowedRoles={[
        //     ROLES.COMPANY_ADMIN
        //   ]}
          />}> 
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/operations/arrivals-today"
            element={<ArrivalsToday />}
          />
          <Route
            path="/operations/ongoing-guests"
            element={<OngoingGuests />}
          />
          <Route
            path="/operations/departures-today"
            element={<DeparturesToday />}
          />
          <Route path="/operations/Week-Arrivals" element={<WeekArrival />} />
          <Route path="/operations/follow-up" element={<FollowUp />} />
          <Route
            path="/operations/guest-movement"
            element={<GuestMovement />}
          />
          <Route path="/operations/Sales" element={<Sales />} />
          <Route
            path="/operations/supplier-payment"
            element={<SupplierPayment />}
          />
          <Route
            path="/operations/today-payment-collection"
            element={<TodayPaymentCollection />}
          />
          <Route
            path="/operations/Transportation"
            element={<Transportation />}
          />

          <Route path="/home" element={<DashLandingPage />} />

          <Route
            path="/operations/arrivals-today"
            element={<ArrivalsToday />}
          />
          <Route
            path="/operations/ongoing-guests"
            element={<OngoingGuests />}
          />
          <Route
            path="/operations/departures-today"
            element={<DeparturesToday />}
          />
          <Route path="/operations/Week-Arrivals" element={<WeekArrival
           />} />
          <Route path="/operations/follow-up" element={<FollowUp />} />
          <Route
            path="/operations/guest-movement"
            element={<GuestMovement />}
          />
          <Route path="/operations/Sales" element={<Sales />} />
          <Route
            path="/operations/supplier-payment"
            element={<SupplierPayment />}
          />
          <Route
            path="/operations/today-payment-collection"
            element={<TodayPaymentCollection />}
          />
          <Route
            path="/operations/Transportation"
            element={<Transportation />}
          />

          <Route path="/home" element={<DashLandingPage />} />

          <Route path="/query" element={<QueryList />} />
          <Route path="/query/:id" element={<QueryView />} />

          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/itineraries/:id/*" element={<ItineraryDetails />} />

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
          <Route
            path="/master/vehicle-category"
            element={<VehicleCategory />}
          />
          <Route path="/master/pickup-drop" element={<PickupDrop />} />
          <Route path="/master/currency" element={<Currency />} />
          <Route path="/master/lead-source" element={<LeadSource />} />
          <Route path="/master/manual-voucher" element={<ManualVoucher />} />
          <Route path="/master/flight" element={<Flight />} />
          <Route path="/master/addons" element={<Addons />} />
          <Route path="/master/wallpaper" element={<Wallpaper />} />
          <Route
            path="/master/account-details"
            element={<MasterAccountDetails />}
          />
          <Route
            path="/master/inclusion-exclusion"
            element={<InclusionExclusion />}
          />

          <Route path="/marketing/dashboard" element={<MarketingDashboard />} />
          <Route path="/marketing/clients-group" element={<ClientsGroup />} />
          <Route
            path="/marketing/email-templates"
            element={<EmailTemplates />}
          />
          <Route
            path="/email-template/add"
            element={<EmailTemplateForm mode="add" />}
          />
          <Route
            path="/email-template/edit/:id"
            element={<EmailTemplateForm mode="edit" />}
          />
          <Route
            path="/email-template/view/:id"
            element={<EmailTemplateForm mode="view" />}
          />

          <Route path="/marketing/campaigns" element={<Campaigns />} />
          <Route path="/marketing/landing-pages" element={<LandingPages />} />
          <Route path="/marketing/landing/add" element={<LandingForm />} />
          <Route path="/marketing/landing/edit/:id" element={<LandingForm />} />

          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<MyProfile />} />
            <Route path="/settings/my-profile" element={<MyProfile />} />
            <Route path="/settings/organisation" element={<Organisation />} />
            <Route path="/settings/default-setting" element={<DefaultSetting />} />
            <Route path="/settings/destinations" element={<SettingsDestinations />} />
            <Route path="/settings/team" element={<Team/>}/>
            <Route
              path="account-details"
              element={<SettingsAccountDetails />}
            />
            <Route path="mail-setting" element={<MailSetting />} />
          </Route>

          <Route path="/emails" element={<EmailInbox />} />
          <Route path="/emails/:id" element={<EmailView />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
