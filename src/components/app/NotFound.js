import React from "react";
import { Link } from "react-router-dom";
import notFoundSvg from '../../resources/undraw_page_not_found_re_e9o6.svg';
const NotFound = () => {
    return (
        <article className="not-found__main">
            <figure className="not-found__svg-fig">
                <img
                    className="not-found__svg" 
                    src= {notFoundSvg}
                    alt="404 error. the page requsted does not exist."
                    title="404 error. the page requsted does not exist."
                    width= '860.13137'
                    height= '571.14799'
                />
            </figure>
            <section className="not-found__content">
                <h1 className="not-found__title-text">Page Not Found!</h1>
                <p className="not-found__paragraph">We're sorry, the page you requested could not be found. Please go back to the home page.</p>
                <Link className="not-found__link" to= '/' replace = {true}>Go Home</Link>
            </section>
        </article>
    );
}

export default NotFound;