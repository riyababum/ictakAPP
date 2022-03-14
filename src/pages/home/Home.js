import './Home.css'

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <body>
        <div className="home">

          
          <div class="details">
            <h1 className="intro">Create your ID card instantly</h1>
            <p className="desc">Get your id card  and download easily</p>
            <div class="homeButtons">
              <Link className="homeBtn" to="/signup">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Get Started
              </Link>
            </div>
          </div>
        </div>

      </body>
    </>
  )
}
export default Home
