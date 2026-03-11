import home from '../assets/home.png';
import BestSeller from '../components/layouts/BestSeller';
import Feature from '../components/layouts/Feature';
import Latest from '../components/layouts/Latest';
const Home = () => {
  return (
    <div>
      <div className="max-w-7xl w-3/4 mx-auto mb-4">
        <a href="">
          <img src={home} alt="Home" />
        </a>
      </div>
      <Feature />
      <BestSeller />
      <Latest />
    </div>
  );
};

export default Home;
