import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

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

    //Function to Calculate Course Chepter Time
    // const calculateChepterTime = (chepter) => {
    //     let time = 0;
    //     chepter.chepterContent.map((lecture) => time+= lecture.lectureDuration);
    //     return humanizeDuration(time*60*1000, { units: ['h', 'm']});
    // }
    const calculateChepterTime = (chapter) => {
        let time = 0;
        if (chapter.chapterContent && Array.isArray(chapter.chapterContent)) {
            chapter.chapterContent.forEach((lecture) => {
                time += lecture.lectureDuration;
            });
        }
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    };

    //Function to Calculate Course Duration
    // const calculateCourseDuration = (course) => {
    //     let time = 0;

    //     course.courseContent.map((chepter) => chepter.chepterContent.map(
    //         (lecture) => time+= lecture.lectureDuration
    //     ));

    //     return humanizeDuration(time*60*1000, { units: ['h', 'm']});
    // }
    const calculateCourseDuration = (course) => {
        let time = 0;
        if (course.courseContent && Array.isArray(course.courseContent)) {
            course.courseContent.forEach((chapter) => {
                if (chapter.chapterContent && Array.isArray(chapter.chapterContent)) {
                    chapter.chapterContent.forEach((lecture) => {
                        time += lecture.lectureDuration;
                    });
                }
            });
        }
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    };

    // Function calculate to No of Lectures in the course
    // const calculateNoOfLectures = (course) => {
    //     let totalLectures = 0;

    //     course.courseContent.map((chepter) => {
    //         if (Array.isArray(chepter.chepterContent)) {
    //             totalLectures += chepter.chepterContent.length;
    //         }
    //     });

    //     return totalLectures;
    // }
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        if (course.courseContent && Array.isArray(course.courseContent)) {
            course.courseContent.forEach((chapter) => {
                if (chapter.chapterContent && Array.isArray(chapter.chapterContent)) {
                    totalLectures += chapter.chapterContent.length;
                }
            });
        }
        return totalLectures;
    };

    // fetch user Enrolled Course 
    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses);
    }

    // useEffect(() => fetchAllCourses(), []);
    useEffect(() => {
        async function fetchData() {
            await fetchAllCourses();
            await fetchUserEnrolledCourses();
        }
        fetchData();
    }, []);

    const value = { currency, allCourses, navigate, calculateRating, isEducator, setIsEducator, calculateChepterTime, calculateCourseDuration, calculateNoOfLectures, enrolledCourses, setEnrolledCourses, };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};