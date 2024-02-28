/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-02-27 11:34:12
 * @modify date 2024-02-27 11:34:12
 * @desc 이벤트 QR코드 인식 모달
 */
/**
 * @author 엄상은
 * @email osy9757@gmail.com
 * @create date 2024-02-28 12:01:12
 * @modify date 2024-02-28 12:01:12
 * @desc 이벤트 Alert 연결 및 QR코드 스캔 결과 처리
 */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import QRScannerComponent from "jsx/components/QrScanner/QRScannerComponent";
import { AlertComponent } from "jsx/components/Alert/AlertComponent";

const EventModal = ({ show, handleClose, eventId }) => {
  const [scanResult, setScanResult] = useState("");
  const [successData, setSuccessData] = useState(null);

  const handleScanData = (data) => {
    if (data) {
      setScanResult(data);
    }
  };

  const handleSuccess = (data) => {
    setSuccessData(data);
  };

  return (
    <Modal show={show} onHide={handleClose} size="">
      <Modal.Header closeButton>
        <Modal.Title>이벤트 QR 코드 스캔</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertComponent successData={successData} />
        <div className="w-full h-full">
          <QRScannerComponent eventId={eventId} handleScan={handleScanData} handleSuccess={handleSuccess} className="w-full h-full" />
        </div>
        {scanResult && (
          <div>
            <strong>스캔 결과:</strong> {scanResult}
          </div>
        )}
        {!scanResult && <div>QR 코드를 스캔하여 이벤트에 회원을 참여시킵니다. 이벤트 ID: {eventId}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
