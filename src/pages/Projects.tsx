import React, { useEffect, useState } from 'react';
import IPageProps from '../interfaces/page';
import { Spinner } from 'reactstrap';
import { firestore as db } from '../config/firebase/firebaseUtils';
import { onSnapshot, collection } from 'firebase/firestore';
import AuthContainerBlock from '../components/AuthContainerBlock';
import ProjectModal from '../components/ProjectModal';

const ProjectsPage: React.FunctionComponent<IPageProps> = (props) => {
    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        //console.log('how often does this change');
        const unsubsrcibe = onSnapshot(
            collection(db, 'projects'),
            (snapshot) => {
                setProjects(snapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            }
        );

        return () => unsubsrcibe();
    }),
        [db];

    return (
        <div className="projects-container">
            <h1>{props.name}</h1>
            <div className="card-conatiner">
                {loading ? (
                    <Spinner color="info" />
                ) : (
                    projects?.map((project: any, index: any) => (
                        <ProjectModal
                            key={index}
                            name={project.project}
                            brand={project.brand}
                            short_description={project.short_description}
                            img={project.img}
                            description={project.description}
                            timeline={project.timeline}
                        />
                    ))
                )}
            </div>
            <AuthContainerBlock>
                <div className="new-project">
                    <h3>Submit a new Project</h3>
                </div>
            </AuthContainerBlock>
        </div>
    );
};

export default ProjectsPage;
