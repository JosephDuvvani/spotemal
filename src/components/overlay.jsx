import '../assets/styles/global.css';

const Overlay = ({children}) => {

  return (
    <div className="overlay">
        {children}
    </div>
  );
}

export default Overlay;