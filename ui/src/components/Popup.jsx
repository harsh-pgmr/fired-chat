import PropTypes from 'prop-types';

export default function Popup (props) {
  const { aiRes, onClose } = props;

  return (
      <div className="absolute top-20 shadow-sm shadow-black flex flex-col justify-center items-center border rounded-md px-6 py-2 max-w-[75%] text-center bg-teal-300 opacity-100 z-100">
        
        <span className="underline text-sm mb-2 mt-2">
          Firey response
        </span>
        <span className="font-bold">{aiRes}</span>

        <button   
          onClick={onClose}
          className="flex justify-center items-center rounded-md bg-white text-black px-2 py-1 border border-black mt-4"
        >
          Close
        </button>
      </div>
    )
}

Popup.propTypes = {
  aiRes: PropTypes.string,
  onClose: PropTypes.func
}