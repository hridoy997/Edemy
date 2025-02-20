import CallToAction from "../../Components/Student/CallToAction";
import Companies from "../../Components/Student/Companies";
import CourseSection from "../../Components/Student/CourseSection";
import Hero from "../../Components/Student/Hero";
import TestimonialsSection from "../../Components/Student/TestimonialsSection";
import Footer from "../../Components/Student/Footer";


const Home = () => {
    return (
        <div className="flex flex-col items-center space-y-7 text-center">
            <Hero />
            <Companies />
            <CourseSection />
            <TestimonialsSection />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Home;