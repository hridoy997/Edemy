import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../Components/Student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../Components/Student/Footer";
import YouTube from "react-youtube";


const CourseDetails = () => {

    const { id } = useParams();
    // const { courseData, setCourseData } = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [openSection, setOpenSection] = useState({});
    const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const { allCourses, calculateRating, calculateChepterTime, calculateCourseDuration, calculateNoOfLectures, currency } = useContext(AppContext);

    const fetchCourseData = async () => {
        const findCourse = allCourses.find(course => course._id === id)
        setCourseData(findCourse);
    }

    useEffect(() => {
        fetchCourseData();
    }, [allCourses, id]);

    const toggleSection = (index) => {
        setOpenSection((prev) => (
            {...prev, 
                [index]: !prev[index]
            }
        ));
    };

    return courseData ? (
        <>
            <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 pt-20 md:pt-28 text-left">
                <div className="absolute top-0 left-0 w-full h-[500px] -z-1 bg-gradient-to-b from-cyan-100/70">

                </div>

                {/* left Columm */}
                <div className="max-w-xl z-10 to-gray-500 pt-3 pb-1 text-sm">
                    <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">{courseData.courseTitle}</h1>
                    <p className="pt-4 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

                    {/* reviews and ratings */}
                    <div className="flex items-center space-x-2">
                        <p>{calculateRating(courseData).toFixed(1)}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (<img key={i}
                                src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                                alt="" className="w-3.5 h-3.5" />))}
                        </div>
                        <p className="text-blue-600">({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
                        <p className="">{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
                    </div>

                    <p className="text-sm">Course by <span className="text-blue-600 underline">GreatStack</span></p>

                    <div className="pt-8 text-gray-800">
                        <h2 className="text-xl font-semibold">Course Structure</h2>
                        <div className="pt-5">
                            {courseData.courseContent.map((chepter, index) => (
                                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                                    <div className="flex justify-between items-center px-4 py-3 cursor-pointer select-none" onClick={() => toggleSection(index)}>
                                        <div className="flex items-center gap-2">
                                            <img className={`transform transition-transform ${openSection[index] ? 'rotate-180' : 'rotate-0'}`} src={assets.down_arrow_icon} alt="down_arrow_icon" />
                                            <p className="font-medium text-sm md:text-base">{chepter.chapterTitle}</p>
                                        </div>
                                        <p className="text-sm md:text-default">{chepter.chapterContent.length} Lectures - {calculateChepterTime(chepter)}</p>
                                    </div>

                                    <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                                        <ul className="list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300">
                                            {chepter.chapterContent.map((lecture, i) => (
                                                <li key={i} className="flex items-center gap-2 py-1">
                                                    <img src={assets.play_icon} alt="play_icon" className="w-4 h-4 mt-1"/>
                                                    <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                                        <p>{lecture.lectureTitle}</p>
                                                        <div className="flex gap-2">
                                                            {lecture.isPreviewFree && <p onClick={() => setPlayerData({
                                                                videoId: lecture.lectureUrl.split('/').pop()
                                                            })} className="text-blue-500 cursor-pointer">Preview</p>}
                                                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm']})}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="py-20 text-sm md:text-default">
                        <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
                        <p className="pt-3 rich-text" dangerouslySetInnerHTML={{ __html: courseData.courseDescription}}></p>
                    </div>

                </div>


                {/* right Columm */}
                <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
                    {/* <img src={courseData.courseThumbnail} alt="courseThumbnail" /> */}
                    {
                                playerData ? 
                                <YouTube videoId={playerData.videoId} opts={{playerVars: {autoplay: 1}}} iframeClassName="w-full aspect-video" />
                                :
                                <img src={courseData.courseThumbnail} alt="courseThumbnail" />
                            }
                    <div className="p-5">

                        <div className="flex items-center gap-2">
                            
                            <img className="w-3.5" src={assets.time_left_clock_icon} alt="time_left_clock_icon" />
                            <p className="text-red-500"><span className="font-medium">5 days</span> left at this price!</p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <p className="text-gray-800 text-2xl md:text-4xl font-semibold">{currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
                            <p className="md:text-lg text-gray-500 line-through">{currency} {courseData.coursePrice}</p>
                            <p className="md:text-lg text-gray-500">{courseData.discount}% off</p>
                        </div>

                        <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
                            <div className="flex items-center gap-1">
                                <img src={assets.star} alt="star" />
                                <p>{calculateRating(courseData)}</p>
                            </div>
                            <div className="h-4 w-px bg-gray-500/40"></div>
                            <div className="flex items-center gap-1">
                                <img src={assets.time_clock_icon} alt="time_clock_icon" />
                                <p>{calculateCourseDuration(courseData)}</p>
                            </div>
                            <div className="h-4 w-px bg-gray-500/40"></div>
                            <div className="flex items-center gap-1">
                                <img src={assets.lesson_icon} alt="lesson_icon" />
                                <p>{calculateNoOfLectures(courseData)} Lesson</p>
                            </div>
                        </div>

                        <button className="text-white font-medium w-full py-3 mt-4 md:mt-6 rounded bg-blue-600">{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

                        <div className="pt-6">
                            <p className="text-lg md:text-xl font-medium text-gray-800">What’s in the course?</p>
                            <ul className="ml-4 pt-2 text-sm md:text-default text-gray-500 list-disc">
                                <li>Lifetime access with free updates.</li>
                                <li>Step-by-step, hands-on project guidance.</li>
                                <li>Down10adab1e resources and source code.</li>
                                <li>Quizzes to test your knowledge.</li>
                                <li>Certificate of completion.</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    ) : <Loading />;
};

export default CourseDetails;