import React, { useState, useEffect } from "react";
import axios from "axios"

function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentPage === 4) {
      // 模拟制作过程，10 秒后完成
      const timer = setTimeout(() => {
        setProgress(100);
        setCurrentPage(5);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentPage, progress]);

  const handleStart = () => {
    setCurrentPage(2);
  };

  const  handleImageSelect = async (image) => {
    setSelectedImage(image);
    setCurrentPage(3);
    let i=100000;
    let balance = 0;
    await axios
        .post("https://daam7-fqaaa-aaaam-acioa-cai.raw.icp0.io/balance",{account:"0101748c07a71f4dffc6ebb0cd77fb18da55ec1c759cb0af3e39034d67f93b86"})
        .then((res) => {
          console.log("-------");
          console.log(res);
          balance = Number(res.data.balance);
          console.log(balance);
        })
        .catch((err) => {
          console.error(err);
        });
    while(i>0){
      if (i%5000===0){
        await axios
        .post("https://daam7-fqaaa-aaaam-acioa-cai.raw.icp0.io/balance",{account:"0101748c07a71f4dffc6ebb0cd77fb18da55ec1c759cb0af3e39034d67f93b86"})
        .then((res) => {
          console.log("=======");
          console.log(res);
          if (Number(res.data.balance) - balance > 10000000){
            setCurrentPage(4);
            console.log("to 4")
            return;
          }
        })
        .catch((err) => {
          console.error(err);
        });
      }
      i--;
    }
    console.log("to 1")

    setCurrentPage(1);
  };

  const handlePayment = () => {
    // 模拟收款，收到 0.01 ICP 后进入下一頁
    
  };

  const handleFinish = () => {
    // 模拟制作完成，返回首页
    setCurrentPage(1);
  };

  const renderPage1 = () => {
    return (
      <div className="container">
        <h1>Web3 手机壳DIY贩卖机</h1>
        < img src="/1.jpg" alt="手机壳" class="mask"/>
        <br/>
        <br/>
        <button className="button" onClick={handleStart}>
          START
        </button>
      </div>
    );
  };

  const renderPage2 = () => {
    return (
      <div className="container">
        <h2>请选择样式</h2>
        <div className="image-grid">
          <img
            src="/1.jpg"
            alt="图案 1" class="mask1" 
            onClick={() => handleImageSelect("image1.png")}
          />
          <img
            src="/1.jpg"
            alt="图案 2" class="mask1" 
            onClick={() => handleImageSelect("image2.png")}
          />
          <img
            src="/1.jpg"
            alt="图案 3" class="mask1" 
            onClick={() => handleImageSelect("image3.png")}
          />
          <img
            src="/1.jpg"
            alt="图案 4" class="mask1" 
            onClick={() => handleImageSelect("image4.png")}
          />
           <img
            src="/1.jpg"
            alt="图案 5" class="mask1" 
            onClick={() => handleImageSelect("image5.png")}
          />
          <img
            src="/1.jpg"
            alt="图案 6" class="mask1" 
            onClick={() => handleImageSelect("image6.png")}
          />
          <img
            src="/1.jpg"
            alt="图案 7" class="mask1" 
            onClick={() => handleImageSelect("image7.png")}
          />
          <img
            src="/1.jpg"
            alt="图案 8" class="mask1" 
            onClick={() => handleImageSelect("image8.png")}
          />
           <img
            src="/1.jpg"
            alt="图案 9" class="mask1" 
            onClick={() => handleImageSelect("image9.png")}
          />
        </div>
      </div>
    );
  };

  const renderPage3 = () => {
    return (

      <div className="container">
        <h2>扫描二维码支付</h2>
        < img src="2.jpg" alt="ICP 收款码" class="opcode" />
        <p>金额: 1$ICP</p >
        
      </div>
    );
  };



  const renderPage4 = () => {
    return (
      <div className="container">
        <h2>正在制作中，请稍后</h2>
        <progress value={progress} max="100" />
      </div>
    );
  };

  const renderPage5 = () => {
    return (
      <div className="container">
        <h2>请拿走手机壳，欢迎下次光临！</h2>
        <button className="button" onClick={handleFinish}>
          返回首页
        </button>
      </div>
    );
  };

  return (
    <main>
     <div className="vending-machine">
      {currentPage === 1 && renderPage1()}
      {currentPage === 2 && renderPage2()}
      {currentPage === 3 && renderPage3()}
      {currentPage === 4 && renderPage4()}
      {currentPage === 5 && renderPage5()}
    </div>
    </main >
  );
}

export default App;
