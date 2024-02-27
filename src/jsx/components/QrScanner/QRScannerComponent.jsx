/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-02-27 03:21:10
 * @modify date 2024-02-27 03:21:10
 * @desc [description]
 */
import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";

const QRScannerComponent = () => {
  const [canScan, setCanScan] = useState(true);
  const [lastScannedTime, setLastScannedTime] = useState(0);

  const handleScan = (data) => {
    const now = Date.now();
    if (data && canScan) {
      console.log("Scan Result:", data);
      setCanScan(false);
      setLastScannedTime(now);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastScannedTime >= 5000) {
        setCanScan(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastScannedTime]);

  return <QrScanner delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%", height: "100%" }} facingMode={"environment"} />;
};

export default QRScannerComponent;
