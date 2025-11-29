import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './router/AppRoutes';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
};

export default App;


