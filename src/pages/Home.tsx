import React from 'react';
import { Button } from 'reactstrap';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    console.log('these are my current props: ' + JSON.stringify(props));
    return (
        <div>
            <p> Home Page (Protected by firebase)</p>
            <Button >Logg out </Button>
        </div>
    );
};

export default HomePage;
