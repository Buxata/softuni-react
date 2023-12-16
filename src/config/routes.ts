import IRoute from '../interfaces/route';
import ChangePasswordPage from '../pages/auth/change';
import UserPage from '../pages/auth/user';
import ForgotPasswordPage from "../pages/auth/forgotten";
import LoginPage from '../pages/auth/login';
import LogoutPage from '../pages/auth/logout';
import RegisterPage from '../pages/auth/register';
import ResetPasswordPage from "../pages/auth/reset";
import HomePage from '../pages/Home';
import ProjectsPage from '../pages/Projects';

const routes: IRoute[] = [
    {
        path: '',
        exact: true,
        component: HomePage,
        name: 'Home',
        protected: true,
        navbar: false,
        navbar_authed: false,
    },
    {
        path: '/projects',
        exact: true,
        component: ProjectsPage,
        name: 'Projects',
        protected: false,
        navbar: true,
        navbar_authed: true,
    },
    {
        path: '/home',
        exact: true,
        component: HomePage,
        name: 'Home',
        protected: true,
        navbar: false,
        navbar_authed: true,
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register',
        protected: false,
        navbar: true,
        navbar_authed: false,
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login',
        protected: false,
        navbar: true,
        navbar_authed: false,
    },
    {
        path: '/user',
        exact: true,
        component: UserPage,
        name: 'User',
        protected: true,
        navbar: false,
        navbar_authed: true,
    },
    {
        path: '/change',
        exact: true,
        component: ChangePasswordPage,
        name: 'Change Password',
        protected: true,
        navbar: false,
        navbar_authed: false,
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout',
        protected: true,
        navbar: false,
        navbar_authed: true,
    },
    {
        path: '/forgotten',
        exact: true,
        component: ForgotPasswordPage,
        name: 'Forgot Password Page',
        protected: false,
        navbar: false,
        navbar_authed: false,
    },
    {
        path: '/reset',
        exact: true,
        component: ResetPasswordPage,
        name: 'Reset Password Page',
        protected: false,
        navbar: false,
        navbar_authed: false,
    }
];

export default routes;
