import React from 'react';
import IPageProps from '../interfaces/page';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { AiOutlineWarning } from 'react-icons/ai';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    console.log('home page rerender');
    return (
        <div className={props.name}>
            {/* Header */}
            <header>
                <AiOutlineVideoCameraAdd size={70} />
                <AiOutlineWarning size={70} />
            </header>
            {/* Hero Section */}
            <section className="hero">
                <h1></h1>
                <p>Delivering Excellence in Production Services</p>
                {/* Add striking visuals here, e.g., images or videos */}
            </section>
            {/* About Us */}
            <section className="about-us">
                <h2>About Us</h2>
                <p>
                    Welcome to Your Production Service Company, where creativity
                    meets precision. We are dedicated to providing top-notch
                    production services tailored to your unique needs. Our
                    mission is to exceed expectations and deliver exceptional
                    results that set your project apart.
                </p>
                {/* Team Showcase, Accolades, or Certifications */}
            </section>
            {/* Services */}
            <section className="services">
                <h2>Our Services</h2>
                <ul>
                    <li>Video Production</li>
                    <li>Photography Services</li>
                    <li>Event Planning and Execution</li>
                    {/* Add more services */}
                </ul>
            </section>
            {/* Projects or Portfolio */}
            <section className="projects">
                <h2>Featured Projects</h2>
                {/* Showcase featured projects, client testimonials, link to full portfolio */}
                {/* Example project card */}
                <div className="project-card">
                    <h3>Project Showcase</h3>
                    <p>
                        Explore a selection of our standout projects that
                        demonstrate our commitment to creativity and quality.
                    </p>
                    {/* Additional project card details */}
                </div>
            </section>
            {/* Why Choose Us */}
            <section className="why-choose-us">
                <h2>Why Choose Us</h2>
                <p>
                    At Your Production Service Company, we stand out for our:
                    professionalism, creative approach, attention to detail, and
                    state-of-the-art equipment. With years of experience, we
                    bring your vision to life.
                </p>
                {/* Key differentiators, experience, and expertise */}
            </section>
            {/* Blog or News Section */}
            <section className="blog">
                <h2>Latest Updates</h2>
                {/* Recent blog posts or news updates */}
                {/* Example blog post */}
                <div className="blog-post">
                    <h3>Unlocking Creativity: A Behind-the-Scenes Look</h3>
                    <p>
                        Dive into our latest blog post where we share insights
                        into our creative process and behind-the-scenes moments.
                    </p>
                    {/* Additional blog post details */}
                </div>
            </section>
            {/* Contact Information */}
            <section className="contact">
                <h2>Contact Us</h2>
                {/* Contact form, contact details, location map */}
                <p>
                    Have a project in mind? Contact us today to discuss how we
                    can bring your ideas to life. We're here to answer any
                    questions and provide tailored solutions for your production
                    needs.
                </p>
                {/* Add a contact form or details */}
            </section>
            {/* Footer */}
            <footer>
                <div>{/* Social media links, copyright information */}</div>
            </footer>
        </div>
    );
};

export default HomePage;
