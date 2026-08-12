// const QRModal = ({ qr, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">
//       <div className="bg-white w-full max-w-md p-6 rounded-xl text-center">
//         <h2 className="text-xl font-bold text-gray-800">Your QR Code</h2>

//         {qr ? (
//           <img src={qr} alt="QR Code" className="mx-auto mt-4 w-64 h-64" />
//         ) : (
//           <p className="mt-4 text-gray-500">No QR available</p>
//         )}

//         <button
//           onClick={onClose}
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

const QRModal = ({ qr, onClose }) => {
  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl text-center w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">QR Code</h2>

        <img src={qr} alt="QR" className="mx-auto w-48 h-48" />

        <div className="mt-4 flex gap-3 justify-center">
          <button
            onClick={downloadQR}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download
          </button>

          <button onClick={onClose} className="border px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
