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


const router = createBrowserRouter([
  {path: '/login', element: <Login/>},
  {path: 'sign-up', element: <SignUp/>},
  {path: '/', element: <HomePage/>},
  {path: '/map', element: <MapComponent/>},
  {path: '/driving/school/:id', element: <Schools/>}
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;