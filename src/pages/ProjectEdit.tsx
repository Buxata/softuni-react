import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore as db } from '../config/firebase/firebaseUtils';
import {
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Input,
    Button,
    Spinner,
} from 'reactstrap';
import ErrorText from '../components/ErrorText';

export interface IEditProjectPageProps {
    id: string;
}

const EditProjectPage: React.FunctionComponent<IEditProjectPageProps> = (
    props
) => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string>('');
    const [project, setProject] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

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

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProject((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const handleCreateProject = async () => {
        const fieldValues = Object.values(project);

        // Checking if any field is an empty string
        if (
            fieldValues.some(
                (value) => typeof value === 'string' && value.trim() === ''
            )
        ) {
            setError('All fields must be filled in.');
            return;
        }
        try {
            // Add the new project to the 'projects' collection
            setDoc(doc(db, 'projects', id ?? props.id), project);

            // Redirect to the newly created project's detail page
            navigate(`/project/${project.id ?? id}`);
        } catch (error: any) {
            setError('Error editing project:' + error.message);
            // Handle error as needed
        }
    };

    return (
        <div className="new-project-container">
            <Card>
                <CardHeader>
                    Edit Project {project.name ?? project.project}
                </CardHeader>
                <CardBody>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <FormGroup>
                            <span>
                                <p>Project Name:</p>
                                <Input
                                    type="text"
                                    name="name"
                                    value={project.name ?? project.project}
                                    defaultValue={
                                        project.name ?? project.project
                                    }
                                    onChange={handleInputChange}
                                />
                            </span>
                            <span>
                                <p>Project brand:</p>
                                <Input
                                    type="text"
                                    name="brand"
                                    value={project.brand}
                                    defaultValue={project.brand}
                                    onChange={handleInputChange}
                                />
                            </span>
                            <span>
                                <p>Short Description:</p>
                                <Input
                                    type="text"
                                    name="short_description"
                                    value={project.short_description}
                                    defaultValue={project.short_description}
                                    onChange={handleInputChange}
                                />
                            </span>
                            <span>
                                <p>Description:</p>
                                <Input
                                    type="textarea"
                                    name="description"
                                    value={project.description}
                                    defaultValue={project.description}
                                    onChange={handleInputChange}
                                />
                            </span>
                            <span>
                                <p>Project timeline:</p>
                                <Input
                                    type="text"
                                    name="timeline"
                                    value={project.timeline}
                                    defaultValue={project.timeline}
                                    onChange={handleInputChange}
                                />
                            </span>
                            <span>
                                <p>Project image link</p>
                                <Input
                                    type="text"
                                    name="img"
                                    value={project.img}
                                    defaultValue={project.img}
                                    onChange={handleInputChange}
                                />
                            </span>
                            <Button
                                block
                                onClick={handleCreateProject}
                                color="primary"
                            >
                                Submit Project Edit
                            </Button>
                        </FormGroup>
                    )}
                </CardBody>
            </Card>

            <ErrorText error={error} />
        </div>
    );
};
export default EditProjectPage;
