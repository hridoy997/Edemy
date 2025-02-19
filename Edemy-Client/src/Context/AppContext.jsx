import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);

    // Fetch allCourses 
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    }

    // Function to calculate average rating of course
    // const calculateRating = (course) => {
    //     if(course.courseRatings.length == 0) {
    //         return 0;
    //     }
    //     let totalRating = 0;
    //     course.courseRatings.forEach((rating) => {
    //         totalRating += rating.rating;
    //     });
    //     return totalRating / course.courseRatings.length;
    // }
    const calculateRating = (course) => {
        if (!course.courseRatings || course.courseRatings.length === 0) {
            return 0;
        }
        const totalRating = course.courseRatings.reduce((sum, rating) => sum + rating.rating, 0);
        return totalRating / course.courseRatings.length;
    };

    useEffect(() => fetchAllCourses(), []);

    const value = { currency, allCourses, navigate, calculateRating, isEducator, setIsEducator,  };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};