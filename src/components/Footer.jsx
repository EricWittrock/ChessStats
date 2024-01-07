export default function Footer() {
  return (
    <footer
      className="text-white text-center text-lg-start"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="container p-4">
        <div className="row">
          <div className="col-sm-6">
            <h5 className="text-uppercase">Improvements to Come</h5>

            <p>
              I would like to make this tool as helpful as possible for
              beginners. If you have a suggestion, feel free to put it in the
              form (see the link to your right). No promises I will implement
              your idea, but I will definitely read it.
            </p>
          </div>
          <div className="col-sm-6">
            
            <h5 className="text-uppercase mb-0">Links</h5>

            <ul className="list-unstyled">
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSc61YeG_dQwLyhRnwWq14R8h-tWFo6HLeuiErBmI9M4QjoLXQ/viewform?usp=sf_link" target="_blank" className="text-white">
                  Suggestions Form
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
