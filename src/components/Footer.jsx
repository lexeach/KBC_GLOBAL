const Footer = () => {
    return <>
       <footer className="bg-dashboard text-light py-4 mt-4">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h5>About Us</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className="col-md-4">
                  <h5>Quick Links</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Website</a>
                    </li>
                    <li>
                      <a href="#">Explorer</a>
                    </li>
                    <li>
                      <a href="#">Brige</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5>Contact Us</h5>
                  <address>
                    123 Street Name
                    <br />
                    City, Country
                    <br />
                    Phone: 123-456-7890
                    <br />
                    Email: example@example.com
                  </address>
                </div>
              </div>
            </div>
          </footer>
    </>
}
export default Footer