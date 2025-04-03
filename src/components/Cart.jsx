import React, { useState, useEffect } from 'react';

function Cart({ cart, total }) {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const clearCart = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  };

  const handleCheckout = () => {
    setShowPopup(true);
    setTimeLeft(60);
  };

  useEffect(() => {
    let timer;
    if (showPopup && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showPopup, timeLeft]);

  return (
    <>
      <aside className="fixed right-0 top-0 p-4 bg-white shadow-lg w-96 max-h-[80vh] overflow-y-auto rounded-lg">
        <h2 className="text-lg font-bold text-[#0d253f]">Shopping Cart</h2>
        <ul className="mt-2 text-[#0d253f]">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between py-1">
              <span>{item.title}</span>
              <span>$20</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[#0d253f]">Total: ${total.toFixed(2)}</p>

        {/* ปุ่มเคลียร์ตระกร้า */}
        <button
          className="mt-4 bg-[#0d253f] text-white py-3 px-6 rounded-lg font-semibold transition-transform duration-300 transform hover:scale-105"
          onClick={clearCart}
        >
          Clear Cart
        </button>

        {/* ปุ่ม checkout */}
        <button
          className="mt-4 bg-[#01b4e4] text-white py-3 px-6 rounded-lg font-semibold transition-transform duration-300 transform hover:scale-105"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </aside>

      {/* เด้งรายการจ่ายเงิน */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-xl font-bold">รายละเอียดการจ่ายเงิน</h3>
            <p>บัญชีธนาคาร : Bank Account Number 123456789</p>
            <p className="text-red-600 font-semibold">เวลานับถอยหลัง: {timeLeft} seconds</p>
            {timeLeft <= 0 && <p className="text-red-600 font-bold">หมดเวลาการชำระเงิน!</p>}

            {/* ป่มปิดการจ่ายเงิน */}
            <button
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;







