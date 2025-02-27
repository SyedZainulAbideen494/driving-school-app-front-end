import { Fragment } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Params,
} from "react-router-dom";
import "./index.css";
import "./App.css";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import HomePage from "./Home/homePage";
import MapComponent from "./map-home-ui/MapContainer";
import Schools from "./schools/schools";
import DrivingSchoolForm from "./add schools/addSchool";
import SchoolListAdmin from "./my-schools/my-schools-display";
import ManageSchoolPage from "./my-schools/my-school";
import AdForm from "./ads/ads-form";
import ManageAdsPage from "./ads/manage-ads";
import AddFunds from "./ads/add-funds";


const router = createBrowserRouter([
  {path: '/login', element: <Login/>},
  {path: 'sign-up', element: <SignUp/>},
  {path: '/', element: <HomePage/>},
  {path: '/map', element: <MapComponent/>},
  {path: '/driving/school/:id', element: <Schools/>},
  {path: '/school/create', element: <DrivingSchoolForm/>},
  {path: '/register/school/form', element: <DrivingSchoolForm/>},
  {path: '/my/schools', element: <SchoolListAdmin/>},
  {path: '/driving/school/admin/:id', element: <ManageSchoolPage/>},
  {path: '/run/ads', element: <AdForm/>},
  {path: '/manage/ads', element: <ManageAdsPage/>},
  {path: '/add/funds', element: <AddFunds/>}
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;