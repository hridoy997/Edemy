import Companies from "../../Components/Student/Companies";
import CourseSection from "../../Components/Student/CourseSection";
import Hero from "../../Components/Student/Hero";
import TestimonialsSection from "../../Components/Student/TestimonialsSection";


const Home = () => {
    return (
        <div className="flex flex-col items-center space-y-7 text-center">
            <Hero />
            <Companies />
            <CourseSection />
            <TestimonialsSection />
        </div>
    );
};

export default Home;