import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateAssignment from "../components/CreateAssignment";
import Assignments from "../components/Assignments";
import ViewAssignment from "../components/ViewAssignment";
import UpdateAssignment from "../components/UpdateAssignment";
import MyAttempts from "../components/MyAttempts";
import Pending from "../pages/Private/Pending";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/my-attempts",
        Component: MyAttempts,
      },
      {
        path: "/pending-assignment",
        Component: Pending,
      },
      {
        path: "/create-assignment",
        Component: CreateAssignment,
      },
      {
        path: '/update-assignment/:id',
        loader: ({ params }) => fetch(`http://localhost:2002/assignments/${params.id}`),
        Component: UpdateAssignment,
      },
      {
        path: '/assignments/:id',
        loader: ({ params }) => fetch(`http://localhost:2002/assignments/${params.id}`),
        Component: ViewAssignment,
      }, {
        path: '/assignments',
        loader: () => fetch('http://localhost:2002/assignments'),
        Component: Assignments,
      }
    ],
  },
]);
export default router;


//! reviewed data like
//! assignmentId
// : 
// "68494bf6161c9fec81d3e640"
// docsLink
// : 
// "https://docs.google.com/document/d/1rZTzqLoPYEPfiRB9YMiA4-yc_KpkFsms1OsZdSg0_o8/edit?tab=t.0"
// examineEmail
// : 
// "sojib1235@gmail.com"
// examineName
// : 
// "Sojib Ahmed"
// examiner
// : 
// "Scarlet Sherman"
// examinerEmail
// : 
// "hawabih@mailinator.com"
// feedback
// : 
// "a"
// givenMark
// : 
// "32"
// note
// : 
// "Rakib vai RR"
// status
// : 
// "reviewed"
// title
// : 
// "Build a Weather Forecast Dashboard"
// totalMark
// : 
// "100"
// _id
// : 
// "68518681daeae04a3868bfcd"