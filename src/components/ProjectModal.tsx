import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProjectCard from './ProjectCard';
import AuthContainerBlock from './AuthContainerBlock';
import { CiFileOn } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

export interface IProjectModalProps {
    img: string;
    name: string;
    brand: string;
    short_description: string;
    timeline: string;
    description: string;
    id: string;
    onDelete: any;
}

const ProjectModal: React.FunctionComponent<IProjectModalProps> = (props) => {
    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => setModal(!modal);

    const linkToProject: string = '/project/' + props.id;

    return (
        <div className="project-modal">
            <ProjectCard
                name={props.name}
                brand={props.brand}
                short_description={props.short_description}
                img={props.img}
                toggle={toggle}
            />
            <Modal isOpen={modal}>
                <ModalHeader toggle={toggle}>
                    <div className="top-row">
                        {props.name}
                        <AuthContainerBlock>
                            <span className="modal-header-menu">
                                <a href={linkToProject}>
                                    <CiFileOn />
                                </a>
                                <a onClick={props.onDelete}>
                                    <MdDelete />
                                </a>
                            </span>
                        </AuthContainerBlock>
                    </div>
                </ModalHeader>
                <ModalBody>
                    {props.description}
                    <br></br>
                    Timeline: {props.timeline}
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button> */}
                    <Button color="secondary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ProjectModal;
