/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-02-27 03:21:10
 * @modify date 2024-02-27 03:21:10
 * @desc QRScanner 컴포넌트
 */
/**
 * @author 엄상은
 * @email sangeun.e.9@gmail.com
 * @create date 2024-02-28 10:41:35
 * @modify date 2024-02-28 10:41:35
 * @desc QRScanner 컴포넌트
 */
import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { useParticipateEvent } from 'hooks/useEventParticipate';

const QRScannerComponent = ({ eventId }) => {
  const [canScan, setCanScan] = useState(true);
  const [lastScannedTime, setLastScannedTime] = useState(0);
  const [memberId, setMemberId] = useState("");
  const { data, loading, error } = useParticipateEvent(eventId, memberId);

  const handleScan = (data) => {
    const now = Date.now();
    if (data && canScan) {
      console.log("Scan Result:", data);
      console.log("Scan Result memberId:", data.text);
      setMemberId(data.text);
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
