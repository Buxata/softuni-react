import React, { useEffect, useState } from 'react';
import IPageProps from '../interfaces/page';
import {
    Spinner,
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardTitle,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { firestore as db } from '../config/firebase/firebaseUtils';
import { onSnapshot, collection } from 'firebase/firestore';

const ProjectsPage: React.FunctionComponent<IPageProps> = (props) => {
    const [projects, setProjects] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        onSnapshot(collection(db, 'projects'), (snapshot: any) => {
            setProjects(snapshot.docs.map((doc: any) => doc.data()));
            setLoading(false);
        }),
            [];
    });

    const navigate = useNavigate();
    return (
        <>
            <h1>{props.name}</h1>
            <div className="card-conatiner">
                {loading ? (
                    <Spinner color="info" />
                ) : (
                    projects?.map((project, index) => (
                        <Card className="project-card" key={index}>
                            <CardImg
                                alt="Card Image Cap"
                                src={project.img}
                                className="project-image"
                            />
                            <CardTitle>{project.project}</CardTitle>
                            <CardSubtitle>{project.brand}</CardSubtitle>
                            <CardBody>{project.short_description}</CardBody>
                            <Button
                                block
                                size="sm"
                                onClick={() => {
                                    navigate('/projects/');
                                }}
                            >
                                {' '}
                                Navigate to {project.project}
                            </Button>
                        </Card>
                    ))
                )}
            </div>
        </>
    );
};

export default ProjectsPage;
