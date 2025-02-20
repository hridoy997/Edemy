import { Route, Routes, useMatch } from "react-router-dom"
import Home from "./Pages/Student/Home"
import CoursesList from "./Pages/Student/CoursesList"
import CourseDetails from "./Pages/Student/CourseDetails"
import MyEnrollments from "./Pages/Student/MyEnrollments"
import Player from "./Pages/Student/Player"
import Loading from "./Components/Student/Loading"
import Educator from "./Pages/Educator/Educator"
import Dashbord from "./Pages/Educator/Dashbord"
import AddCourse from "./Pages/Educator/AddCourse"
import MyCourses from "./Pages/Educator/MyCourses"
import StudentEnrolled from "./Pages/Educator/StudentEnrolled"
import Navbar from "./Components/Student/Navbar"


const App = () => {

  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />} >
          <Route path="educator" element={<Dashbord />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="Student-enrolled" element={<StudentEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
