import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore as db } from '../config/firebase/firebaseUtils';
import { doc, getDoc } from 'firebase/firestore';
import { Spinner, UncontrolledCarousel } from 'reactstrap';

export interface IProjectPageProps {
    id: string;
}

const ProjectDetailPage: React.FunctionComponent<IProjectPageProps> = (
    props
) => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    console.log(id);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectDoc = await getDoc(
                    doc(db, 'projects', id ?? props.id)
                );
                setProject(projectDoc.data());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project:', error);
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);
    
    return (
        <div className="project-detail-container">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h2>{project.name || project.project}</h2>
                    <h5>{project.short_description}</h5>
                    <h6>Timeline: {project.timeline}</h6>
                    <div>{project.description}</div>

                    <UncontrolledCarousel
                        items={[
                            {
                                altText: 'Slide 1',
                                caption: 'Slide 1',
                                key: 1,
                                src: 'https://picsum.photos/id/123/1200/600',
                            },
                            {
                                altText: 'Slide 2',
                                caption: 'Slide 2',
                                key: 2,
                                src: 'https://picsum.photos/id/456/1200/600',
                            },
                            {
                                altText: 'Slide 3',
                                caption: 'Slide 3',
                                key: 3,
                                src: 'https://picsum.photos/id/678/1200/600',
                            },
                        ]}
                    />
                </>
            )}
        </div>
    );
};

export default ProjectDetailPage;
