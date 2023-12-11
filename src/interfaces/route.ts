export default interface IRoute {
    path: string;
    exact: boolean;
    component: React.FunctionComponent<IRoute>;
    name: string;
    protected: boolean;
    navbar: boolean;
    navbar_authed: boolean;

    // eslint-disable-next-line semi
}
