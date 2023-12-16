import React from 'react';
import IPageProps from '../interfaces/page';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <p> Home Page (Protected by firebase)</p>
        </div>
    );
};

export default HomePage;
