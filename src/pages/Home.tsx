import React from 'react';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    console.log('these are my current props: ' + JSON.stringify(props));
    return (
        <div>
            <p> Home Page (Protected by firebase)</p>
        </div>
    );
};

export default HomePage;
