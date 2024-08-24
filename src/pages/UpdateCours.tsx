import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApiCourse } from "../hooks/useApiCours";
import UpdateCoursForm from "../components/UpdateCoursForm";
import Loader from "../components/Loader";
import { Course } from "../utils/types/types";

const UpdateCours: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const { fetchCourseById } = useApiCourse();

    useEffect(() => {
        const fetchData = async () => {
            console.log("course : ", course);
            if (courseId && course === null) {
                console.log("courseId : ", courseId);
                try {
                    const courseData = await fetchCourseById(Number(courseId));
                    console.log("courseData : ", courseData);
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

    console.log("courseId : ", courseId);

    if (loading) return <Loader />;
    if (!courseId || !course)
        return <p>Course not found or no course ID provided.</p>;

    return (
        <div className="w-full flex flex-col text-white">
            <UpdateCoursForm course={course} />
        </div>
    );
};

export default UpdateCours;
