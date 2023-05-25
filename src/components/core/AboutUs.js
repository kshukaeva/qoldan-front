import React from 'react';
import about from '../../img/about.png';
import vector1 from '../../img/vector.svg'
import vector2 from '../../img/vector1.svg'
import vector3 from '../../img/vector2.svg'
import img from '../../img/img.png'
function AboutUs(props) {

    return (
        <div className='about-main'>
        <div className='about'>
            <div className='presentation'>
                {/*<img src={about} alt ="about"/>*/}
                {/*<img className='vector1' src={vector1} alt="vector1"/>*/}
                <div className='row'>
                    <div className='column1'>
                        <img className='vector1' src={vector1} alt="vector1"/>
                    </div>
                    <div className='column3'>
                        <img className='vector3' src={vector3} alt="vector3"/>
                    </div>
                    <div className='column2'>
                        <img className='vector2' src={vector2} alt="vector2"/>
                    </div>
                    <div className='column4'>
                        <img className='img-about' src={about} alt ="about"/>
                    </div>
                </div>
            </div>
            <p>QOLDAN</p>
            {/*<div className='carts'>*/}

            {/*</div>*/}


        </div>
            <div className='card-group'>
                <div className='card1'>
                    <span className="rediscovering-the-charm-of-the-p">
            Rediscovering the Charm of the Past
          </span>
                    <span className="we-believe-that-every-vintage-pi">
            We believe that every vintage piece has a story to tell, and we are
            on a mission to rediscover and share the charm of the past with our
            customers.{" "}
          </span>
                </div>
                <div className='card2'>
                    <span className="sustainability-style-and-soul">
            Sustainability, Style, and Soul
          </span>
                    <span className="by-choosing-vintage-and-second-h">
            By choosing vintage and second-hand, you are not only making a style
            statement but also connecting with the rich heritage and history of
            these items.
          </span>
                </div>
                <div className='card3'>
                     <span className="quality-authenticity-and-service">
            Quality, Authenticity, and Service
          </span>
                    <span className="we-carefully-curate-our-collecti">
            We carefully curate our collection to ensure that each item meets
            our high standards of quality and authenticity.
          </span>
                </div>
            </div>
            <div className='team'>
                <div className='team-image'>
                    <img src={img} alt="img-team"/>
                </div>
                <div className='team-text'>
                    We are a team of students who strive to create useful and necessary
        applications and websites for people. Our goal is to make a more
        convenient and accessible marketplace for vintage and supported
        products, where users can make purchases without any difficulties.
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
