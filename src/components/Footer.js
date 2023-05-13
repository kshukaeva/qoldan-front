import React from 'react';
import {RiFacebookCircleLine,RiInstagramLine, RiTwitterFill} from 'react-icons/ri';

export default function Footer() {
  return (
    <footer>
      <div className='container'>
        <div className="row">
          <div className="footer-col footer-col-left">
            <b>QOLDAN</b>
            <p>We help you find your dream good</p>
            <div className='social-icons'>
              <RiFacebookCircleLine className='icons' />
              <RiInstagramLine className='icons'/>
              <RiTwitterFill className='icons'/>
            </div>
          </div>
          <div className="footer-col footer-col-right">
            <div>
              <h4>Information</h4>
              <ul>
                <li>About</li>
                <li>Product</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Customer</h4>
              <ul>
                <li>User agreement</li>
                <li>Privacy policy</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>Support Chat</li>
                <li>8777777777</li>
                <li>Astana city</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
