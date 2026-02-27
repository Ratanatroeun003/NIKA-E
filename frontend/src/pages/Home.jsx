import home from '../assets/home.png';
import Feature from '../Layout/Feature';
import logoW from '../assets/logoW.png';
import Latest from '../Layout/Latest';
const Home = () => {
  return (
    <div>
      <div className="max-w-7xl w-3/4 mx-auto mb-4">
        <a href="">
          <img src={home} alt="Home" />
        </a>
      </div>
      <Feature />
      <div className="w-3/4 mx-auto mb-4">
        <a href="">
          {' '}
          <img src={logoW} alt="LogoW" className="object-cover" />
        </a>
      </div>
      <Latest />
    </div>
  );
};

export default Home;
