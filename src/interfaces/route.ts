export default interface IRoute {
    path: string;
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
    navbar: boolean;
    navbar_authed: boolean;
}