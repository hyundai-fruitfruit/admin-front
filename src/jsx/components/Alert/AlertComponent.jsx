import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

/**
 * @author 엄상은
 * @email sangeun.e.9@gmail.com
 * @create date 2024-02-28 11:21:35
 * @modify date 2024-02-28 11:21:35
 * @desc Alert 컴포넌트
 */

const emojis = {
    success: (
      <svg
        viewBox='0 0 24 24'
        width='24'
        height='24'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='me-2'
      >
        <polyline points='9 11 12 14 22 4'></polyline>
        <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'></path>
      </svg>
    )
  };

export function AlertComponent({ successData }) {
    const [show, setShow] = useState(successData);

    useEffect(() => {
        setShow(successData);

        if (successData) { // successData가 truthy일 때만 타이머를 설정합니다.
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [successData]);

    return (
        <Alert variant="success" dismissible show={show}>
            {emojis.success} {" "}
            <strong>성공! </strong> 이벤트 참여에 성공했습니다. 
        </Alert>
    );
}
