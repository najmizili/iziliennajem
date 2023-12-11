import React from 'react';

const Home = () => {
  return (
    <>
      <style>{`
        
        @font-face {
          font-family: 'ggg';
          src: url('./fonts/Houstone-Expanded.otf') format('woff')
        }


        .wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        

        main {
          display: flex;
          gap: 5.9em;
          margin-top: 2em;
        }

        .left-col {
          width: 45%;
        }
        .right-col{
          flex-grow:1;
      }

        .right-col {
          flex-grow: 1;
          display: grid;
          gap: 2.3em;
          grid-template-columns: repeat(2, auto);
          grid-template-areas: "left ."
                              "left .";
        }

        h1 {
          font-size: 55px;
          font-family: "Playfair Display";
          font-weight: normal;
          margin: 0;
          color: azure;
        }

        .topdetail {
          font-size: 18px;
          text-transform: uppercase;
          color: bisque;
          font-family: 'ggg', sans-serif;
        }

        .cta-btns {
          margin: 15px 0;
          display: flex;
          gap: 20px;
        }

        .primary-cta {
          background-color: #3f3f3f;
          padding: 1em 2em;
          border-radius: .9em;
          font-size: 16px;
          text-decoration: none;
          color: rgb(255, 255, 255);
          font-weight: bold;
        }

        .secondary-cta {
          display: flex;
          gap: .5em;
          font-size: 15px;
          text-decoration: none;
          color: rgb(255, 255, 255);
          padding: 1em 0;
          display: block;
          font-family: 'ggg', sans-serif;
        }

        .secondary-cta svg {
          width: 20px;
          transition: transform .3s;
        }

        .news {
          display: flex;
          border-radius: .9em;
          gap: 4.2em;
          padding: 5em;
          position: relative;
        }

        .gg {
          width: 62%;
          margin-top: 2cm;
        }
        .pic {
          display: flex;
          justify-content: space-between;

        }

        .gg2 {
          width: 31.7%;
          float: right;
          margin-right: 20px;
          margin-top: 2cm;
        }

        .gg3 {
          width: 60%;
          height: 1px;
          margin-left: 20%;
          padding-top: 2cm;
        }

        .news:before {
          position: absolute;
          content: "";
          background-image: url('../images/confetti.svg');
          width: 100px;
          height: 100px;
          top: -20px;
          left: -20px;
          z-index: 2;
        }

        p.employees {
          font-size: 26px;
          margin: 0;
          font-weight: 300;
          line-height: 120%;
        }

        p.details {
          font-size: 11px;
          font-weight: 300;
          margin: 0;
        }

        .card {
          gap: 1.8em;
          border-radius: .8em;
          padding: 13px;
          align-items: end;
          background-size: 150%;
          display: flex;
          justify-content: space-between;
          transition: background-size 800ms;
        }

        .card1 {
          grid-area: left;
          background-image: url('clothing1.jpg');
          position: relative;
        }

        .card1:before {
          position: absolute;
          content: "";
          background: url('../images/tag.svg') no-repeat;
          height: 100%;
          width: 100%;
          top: 20px;
          left: -30px;
          pointer-events: none;
        }

        .card2 {
          background-image: url('clothing2.jpg');
        }

        .card3 {
          background-image: url('clothing3.jpg');
        }

        .card-detail {
          background-color: white;
          border-radius: .6em;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 8px;
          align-items: center;
          transition: transform 800ms;
          font-family: 'ggg', sans-serif;
        }

        .card-detail a {
          font-size: 17px;
          font-weight: bold;
          text-decoration: none;
          color: rgb(0, 0, 0);
          font-family: 'ggg', sans-serif;
        }

        .card-detail p {
          font-size: 13px;
          margin: 0;
        }

        p.product-price {
          font-size: 17px;
        }

        nav ul li a:hover:before {
          width: 35%;
        }

        .primary-cta:hover {
          background-color: #DEAF8C;
        }

        .secondary-cta:hover svg {
          transform: translateX(10px);
        }

        .secondary-cta:hover {
          text-decoration: underline;
        }

        .card:hover {
          background-size: 160%;
        }

        .card:hover .card-detail {
          transform: translateY(-10px);
        }

        .overlay {
          position: absolute;
          background: white;
          z-index: 999;
          width: 100%;
          height: 100%;
          animation: reveal 1s ease-in forwards;
          transform-origin: bottom;
        }

        @keyframes reveal {
          from {
            transform: scaleY(1);
          }
          to {
            transform: scaleY(0);
          }
        }

        main {
          animation: growIn 2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
          transform: scale(.4);
        }

        @keyframes growIn {
          to {
            transform: scale(1);
          }
        }
      `}</style>

      <div className="overlay"></div>
      <div className="wrapper">
        <main>
          {/* Left Column */}
          <div className="left-col">
            <h1>Raja Store </h1>
            <h1>Now open to Raja fans</h1>
            <p className="topdetail">Green Club shirts and echapes are available to everyone inside Morocco .</p>
            <div className="cta-btns">
              <a href="/y" className="primary-cta">Browse collection</a>
              <a href="/category/MenKits" className="secondary-cta">
                <span>Home Kit 22/23</span>
                <svg width="25" height="14" viewBox="0 0 25 14" fill="none">
                  <path d="M24.1166 7.8347C24.4644 7.49913 24.4743 6.9452 24.1387 6.59746L18.6703 0.930679C18.3347 0.582937 17.7808 0.573067 17.4331 0.908634C17.0853 1.2442 17.0755 1.79813 17.411 2.14587L22.2718 7.18301L17.2347 12.0438C16.8869 12.3794 16.8771 12.9333 17.2126 13.281C17.5482 13.6288 18.1021 13.6387 18.4499 13.3031L24.1166 7.8347ZM0.475379 7.6698L23.4935 8.07992L23.5246 6.3302L0.506555 5.92008L0.475379 7.6698Z" fill="black" />
                </svg>
              </a>
            </div>
            <div className="news">
              <p className="employees"></p>
              <p className="details"></p>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-col">
            <div className="card card1">
              <div className="card-detail">
                <div>
                  <a href="/category/Echapes">Echapes</a>
                  <p>Large</p>
                </div>
                <p className="product-price">$49</p>
              </div>
            </div>
            <div className="card card2">
              <div className="card-detail">
                <div>
                  <a href="/category/MenKits">Man Kits</a>
                  <p>Limited</p>
                </div>
                <p className="product-price">$49</p>
              </div>
            </div>
            <div className="card card3">
              <div className="card-detail">
                <div>
                  <a href="/category/WomanKits">Woman Kits</a>
                  <p>available</p>
                </div>
                <p className="product-price">$49</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <img className="gg3" src="lighn.jpg" alt="" />
      <div className='pic'><img className="gg" src="clothes.jpg" alt="" />
      <img className="gg2" src="clothes2.jpg" alt="" /></div>
    </>
  );
};

export default Home;
