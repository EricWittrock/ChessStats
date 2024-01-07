import Logo from '../assets/logo.png'

export default function Header() {
    return (
        <div>

        <header className="py-3 mb-4">
        <div className="container text-center">
            <h1 className="text-white title">MyChessOpening</h1>
            <img src={Logo} className="logo" alt="logo" />
        </div>

        <nav className="py-2 bg-dark border-bottom">
            <div className="container d-flex flex-wrap justify-content-center">
            <ul className="nav">
                <li className="nav-item"><a href="./info" className="nav-link link-light px-2">Info</a></li>
                <li className="nav-item"><a href="https://docs.google.com/forms/d/e/1FAIpQLSc61YeG_dQwLyhRnwWq14R8h-tWFo6HLeuiErBmI9M4QjoLXQ/viewform?usp=sf_link" target='_blank' className="nav-link link-light px-2">Suggestions</a></li>
            </ul>
            </div>
        </nav>
        </header>

        </div>
    );
}