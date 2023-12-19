import React from 'react';
import {
    Card,
    CardImg,
    CardTitle,
    CardBody,
    CardSubtitle,
    Button,
} from 'reactstrap';

export interface IProjectComponentProps {
    img: string;
    name: string;
    brand: string;
    short_description: string;
    toggle: any;
}

const ProjectComponent: React.FunctionComponent<IProjectComponentProps> = (
    props
) => {
    return (
        <Card className="project-card">
            <CardImg
                alt="Card Image Cap"
                src={props.img}
                className="project-image"
            />
            <CardTitle>{props.name}</CardTitle>
            <CardSubtitle>{props.brand}</CardSubtitle>
            <CardBody>{props.short_description}</CardBody>
            <Button block size="sm" onClick={props.toggle}>
                Navigate to {props.name}
            </Button>
        </Card>
    );
};

export default ProjectComponent;
