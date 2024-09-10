import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiCourse } from "../../hooks/useApiCours";
import UpdateCoursForm from "../../components/form/UpdateCoursForm";
import Loader from "../../components/common/Loader";
import { Course } from "../../utils/types/types";
import { FaAngleLeft } from "react-icons/fa6";

const UpdateCours: React.FC = () => {
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const { fetchCourseById } = useApiCourse();

    useEffect(() => {
        const fetchData = async () => {
            if (courseId && course === null) {
                try {
                    const courseData = await fetchCourseById(Number(courseId));
                    if (courseData) {
                        setCourse(courseData);
                    } else {
                        // Optionnel : gérer les cas où aucun cours n'est trouvé
                        console.error("Course not found.");
                    }
                } catch (err) {
                    console.error("Failed to fetch course:", err);
                } finally {
                    setLoading(false);
                }
            } else {
                // Optionnel : gérer les cas où l'ID du cours est manquant
                console.error("Course ID is missing.");
                setLoading(false);
            }
        };

        fetchData();
    }, [course, courseId, fetchCourseById]);

    if (loading) return <Loader />;
    if (!courseId || !course)
        return <p>Course not found or no course ID provided.</p>;

    return (
        <div className="w-full flex flex-col text-white">
            <div
                onClick={() => navigate(-1)}
                className="hover:text-red-500 w-full text-left text-2xl mb-4 cursor-pointer"
            >
                <FaAngleLeft />
            </div>
            <UpdateCoursForm course={course} />
        </div>
    );
};

export default UpdateCours;
