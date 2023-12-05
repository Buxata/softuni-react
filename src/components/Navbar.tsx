import './Navbar.css'

export default function Navbar() {
    return (
        <ul className="navigation">
            <li>
                <a href="/home">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/contacts">Contacts</a>
            </li>
            <li>
                <a href="/projects">Projects</a>
            </li>
            <li>
                <a href="/people">People</a>
            </li>
        </ul>
    )
}
