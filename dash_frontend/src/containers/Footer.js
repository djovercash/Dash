import React from 'react'
import moment from 'moment-timezone'

const Footer = () => {
  const year = moment(Date.now()).format("YYYY")
  return (
    <div id="footer">
      <div id="footerCopy">
        <h5>&copy;DASH {year} All rights reserved</h5>
      </div>
      <div>
        <nav className="footerNav">
          <ul>
            <li><a href="#"><i><img src="FB.png" /></i></a></li>
            <li><a href="#"><i><img src="Logos-Twitter-icon.png" /></i></a></li>
            <li><a href="#"><i><img src="Instgram.png" /></i></a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Footer
