const Hero = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="position-relative">
        <h1 className="hero-name mt-2">lorem ipsum</h1>
        <img
          className="hero-flower"
          src="https://www.pngkey.com/png/full/15-155414_aesthetic-flower-png-aesthetic-rose-png.png"
        />
        <svg width="520" height="400" className="hero-frame">
          <rect className="hero-rect" x="10" y="10" width="500" height="380" />
          <img src="http://cdn141.picsart.com/309256266262211.png?type=webp&to=min&r=1024" />
        </svg>
        <svg className="hero-poly" height="500" width="400">
          <polygon points="400,30 150,450 30,120" />
        </svg>

        <img src="http://cdn141.picsart.com/309256266262211.png?type=webp&to=min&r=1024" />
      </div>
    </div>
  );
};

export default Hero;
