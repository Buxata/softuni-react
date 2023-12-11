import React from 'react';
import IPageProps from '../interfaces/page';

const ProjectsPage: React.FunctionComponent<IPageProps> = (props) => {
    return (
        <>
            <h1>{props.name}</h1>
        </>
    );
};

export default ProjectsPage;
