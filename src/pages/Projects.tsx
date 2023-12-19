import React, { useEffect, useState } from 'react';
import IPageProps from '../interfaces/page';
import { Spinner } from 'reactstrap';
import { firestore as db } from '../config/firebase/firebaseUtils';
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore';
import ProjectModal from '../components/ProjectModal';
import { Unsubscribe } from 'firebase/auth';
import { BiAddToQueue } from 'react-icons/bi';
import AuthComponentBlock from '../components/AuthContainerBlock';
import ErrorText from '../components/ErrorText';

const ProjectsPage: React.FunctionComponent<IPageProps> = (props) => {
    const [error, setError] = useState<string>();
    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleDeleteProject = async (projectId: string) => {
        try {
            await deleteDoc(doc(db, 'projects', projectId));
        } catch (error: any) {
            setError('Error deleting project:' + error.message);
            // Handle error as needed
        }
    };

    useEffect(() => {
        const cachedProjects = localStorage.getItem('cachedProjects');

        if (cachedProjects) {
            setProjects(JSON.parse(cachedProjects));
            setLoading(false);
        }

        const unsubscribe: Unsubscribe = onSnapshot(
            collection(db, 'projects'),
            (snapshot) => {
                const projectsData = snapshot.docs.map((doc) => ({
                    id: doc.id, // Include the document ID
                    ...doc.data(), // Include the rest of the document data
                }));
                setProjects(projectsData);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    console.log(projects);

    return (
        <>
            <div className="projects-container">
                <div className="top-row">
                    <h1>{props.name}</h1>

                    <div>
                        <AuthComponentBlock>
                            <a href="/newProject">
                                New Project
                                <BiAddToQueue size={20} />
                            </a>
                        </AuthComponentBlock>
                    </div>
                </div>
                <div className="card-container">
                    {loading ? (
                        <Spinner color="info" />
                    ) : (
                        projects?.map((project: any, index: any) => (
                            <ProjectModal
                                key={index}
                                name={
                                    project.name
                                        ? project.name
                                        : project.project
                                }
                                brand={project.brand}
                                short_description={project.short_description}
                                img={project.img}
                                description={project.description}
                                timeline={project.timeline}
                                id={project.id}
                                onDelete={() => handleDeleteProject(project.id)}
                            />
                        ))
                    )}
                </div>
            </div>
            <ErrorText error={error} />
        </>
    );
};

export default ProjectsPage;
