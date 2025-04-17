import '../assets/styles/global.css';

const TargetOverlay = ({ targets, close, start }) => {

  return (
    <div className="target-overlay">
        <div className="targets">
        {targets.map((target, index) => (
            <div key={index} className='target'>
                <img src={target.imageUrl} alt="" />
                <p>{target.name}</p>
            </div>
        ))}
        </div>
        <button className='start' onClick={start}>Start</button>
        <button onClick={close} className='close'>Close</button>
    </div>
  );
}

export default TargetOverlay;