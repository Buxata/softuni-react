import React from 'react';
import IPageProps from '../interfaces/page';

const NoPage: React.FunctionComponent<IPageProps> = (props) => {
    return (
        <>
            <h1>{props.name}</h1>
            <h3>Sorry I coun't find the page you are looking for....</h3>
        </>
    );
};

export default NoPage;
