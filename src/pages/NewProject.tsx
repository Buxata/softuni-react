import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore as db } from '../config/firebase/firebaseUtils';
import {
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Input,
    Button,
} from 'reactstrap';
import IRoute from '../interfaces/route';
import ErrorText from '../components/ErrorText';

const NewProjectPage: React.FunctionComponent<IRoute> = (props) => {
    const [error, setError] = useState<string>('');
    const [newProjectData, setNewProjectData] = useState({
        name: '',
        brand: '',
        short_description: '',
        description: '',
        timeline: '',
        img: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProjectData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCreateProject = async () => {
        if (
            !newProjectData.name ||
            !newProjectData.brand ||
            !newProjectData.short_description ||
            !newProjectData.description ||
            !newProjectData.timeline ||
            !newProjectData.img
        ) {
            // Display an error message or handle validation failure as needed
            setError('All fields must be filled in.');
            return;
        }
        try {
            // Add the new project to the 'projects' collection
            const newDocRef = await addDoc(
                collection(db, 'projects'),
                newProjectData
            );
            const newProjectId = newDocRef.id;

            // Redirect to the newly created project's detail page
            navigate(`/project/${newProjectId}`);
        } catch (error: any) {
            setError('Error creating project:' + error.message);
            // Handle error as needed
        }
    };

    return (
        <div className="new-project-container">
            <Card>
                <CardHeader>{props.name}</CardHeader>
                <CardBody>
                    <FormGroup>
                        <span>
                            <p>Project Name:</p>
                            <Input
                                type="text"
                                name="name"
                                value={newProjectData.name}
                                onChange={handleInputChange}
                            />
                        </span>
                        <span>
                            <p>Project brand:</p>
                            <Input
                                type="text"
                                name="brand"
                                value={newProjectData.brand}
                                onChange={handleInputChange}
                            />
                        </span>
                        <span>
                            <p>Short Description:</p>
                            <Input
                                type="text"
                                name="short_description"
                                value={newProjectData.short_description}
                                onChange={handleInputChange}
                            />
                        </span>
                        <span>
                            <p>Description:</p>
                            <Input
                                type="textarea"
                                name="description"
                                value={newProjectData.description}
                                onChange={handleInputChange}
                            />
                        </span>
                        <span>
                            <p>Project timeline:</p>
                            <Input
                                type="text"
                                name="timeline"
                                value={newProjectData.timeline}
                                onChange={handleInputChange}
                            />
                        </span>
                        <span>
                            <p>Project image link</p>
                            <Input
                                type="text"
                                name="img"
                                value={newProjectData.img}
                                onChange={handleInputChange}
                            />
                        </span>
                    </FormGroup>
                    <Button block onClick={handleCreateProject} color="primary">
                        Submit new Project
                    </Button>
                </CardBody>
            </Card>

            <ErrorText error={error} />
        </div>
    );
};
export default NewProjectPage;
