import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProjectCard from './ProjectCard';

export interface IProjectModalProps {
    img: string;
    name: string;
    brand: string;
    short_description: string;
    timeline: string;
    description: string;
}

const ProjectModal: React.FunctionComponent<IProjectModalProps> = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div className='project-modal'>
            <ProjectCard
                name={props.name}
                brand={props.brand}
                short_description={props.short_description}
                img={props.img}
                toggle={toggle}
            />
            <Modal isOpen={modal} toggle={toggle} fullscreen>
                <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
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
