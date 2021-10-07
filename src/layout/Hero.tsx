const Hero = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="position-relative">
        <h1 className="hero-name">vaporwave</h1>
        <svg width="520" height="400" className="hero-frame">
          <rect className="hero-rect" x="10" y="10" width="500" height="380" />
          <img src="http://cdn141.picsart.com/309256266262211.png?type=webp&to=min&r=1024" />
        </svg>
        <img src="http://cdn141.picsart.com/309256266262211.png?type=webp&to=min&r=1024" />
      </div>
    </div>
  );
};

export default Hero;
