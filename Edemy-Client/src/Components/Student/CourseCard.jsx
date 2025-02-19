import { useContext } from "react"
import { assets } from "../../assets/assets"
import { AppContext } from "../../Context/AppContext"
import { Link } from "react-router-dom";


const CourseCard = ({ course }) => {

    const {_id, courseThumbnail, courseTitle, educator, coursePrice, discount, courseRatings} = course;

    const { currency, calculateRating } = useContext(AppContext);

    return (
        <Link to={`/course/${_id}`} onClick={window.scrollTo(0,0)} className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg">
            <img className="w-full" src={courseThumbnail} alt="" />
            <div className="p-3 text-left">
                <h3 className="text-base font-semibold">{courseTitle}</h3>
                <p className="text-gray-500">{educator.name}</p>
                <div className="flex items-center space-x-2">
                    <p>{calculateRating(course).toFixed(1)}</p>
                    <div className="flex">
                        {[...Array(5)].map((_, i)=>(<img key={i} 
                        src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                        alt="" className="w-3.5 h-3.5"/>))}
                    </div>
                    <p className="text-gray-500">{courseRatings.length}</p>
                </div>
                <p className="text-base font-semibold text-gray-800">{currency}{(coursePrice - discount*coursePrice / 100).toFixed(2)}</p>
            </div>
        </Link>
    )
}

export default CourseCard
