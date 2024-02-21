/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-21 13:33:04
 * @modify date 2024-02-21 13:33:04
 * @desc [description]
 */
import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import CkEditorBlog from '../Forms/CkEditor/CkEditorBlog';
import DateRangePicker from "react-bootstrap-daterangepicker";
import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import axios from 'axios';
import '../../index.css'

const ContentAdd = () => {
    const navigate = useNavigate(); // navigate

    const [title, setTitle] = useState(''); // 이벤트 제목
    const [startDate] = useState(new Date());
    const [endDate] = useState(new Date());
    const [maxCount,setMaxCount] = useState(0);
    const [editorContent,setEditorContent] = useState('');

    const [eventType, setEventType] = useState(''); // 이벤트 타입
    const [rewardType, setRewardType] = useState(''); // 보상 타입
    
    const [timeRanges, setTimeRanges] = useState([]); // 시간 범위 목록을 관리하는 state

    const [selectedStartTime, setSelectedStartTime] = useState(dayjs());
    const [selectedEndTime, setSelectedEndTime] = useState(dayjs());

    // 시간 부분만 추출 및 정수로 변환
    const activeTimeList = timeRanges.map((timeRange) => ({
        opennedAt: parseInt(timeRange.startTime.split(':')[0], 10), 
        closedAt: parseInt(timeRange.endTime.split(':')[0], 10), 
    }));

    // 사용자가 "확인" 버튼을 클릭했을 때 호출되는 함수
    const handleAddTimeRange = () => {
        const newTimeRange = {
            startTime: selectedStartTime.format("HH:mm"),
            endTime: selectedEndTime.format("HH:mm"),
        };

        // 시간 범위 목록에 새로운 시간 범위 추가
        setTimeRanges([...timeRanges, newTimeRange]);

        // 선택된 시간 초기화
        setSelectedStartTime(dayjs());
        setSelectedEndTime(dayjs());
    };

    // 날짜 formating
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    };

    // HtmlTag 제거
    const removeHtmlTags = (str) => {
        return str.replace(/<[^>]*>?/gm, '');
    };

    const getEventTypeLabel = () => {
        switch(eventType) {
            case 'RESTAURANT': return '식당';
            case 'SHOPPING': return '쇼핑';
            case 'CAFE': return '카페';
            default: return '이벤트분류'; // 기본값 혹은 선택되지 않았을 때
        }
    };

    const getRewardTypeLabel = () => {
        switch(rewardType) {
            case 'COUPON': return '쿠폰';
            case 'POINT': return '포인트';
            case 'GIFT' : return '사은품';
            case 'EVENT' : return '이벤트';
            case 'ETC': return '그 외';
            default: return '보상분류'; // 기본값 혹은 선택되지 않았을 때
        }
    };
    
    const handleEventSubmit = async () => {
        const eventDetails = {
            title,
            startedAt: formatDate(startDate),
            finishedAt: formatDate(endDate),
            maxCount,
            eventType,
            rewardType,
            content: editorContent,
            activeTimeList
        };
        
        // API 엔드포인트 URL
        const API_ENDPOINT = '/api/v1/admin/events';
    
        // 요청에 포함할 헤더
        const headers = {
            'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMiIsImlhdCI6MTcwNzk3MzU3MiwiZXhwIjoyMDcwODUzNTcyfQ.XwBiQxnJUzSSdhLOQQj3aKS5erufHTuIgD0mGNw576iHLZmGjc5ei8ks2MgVV6m6SvNE3EjuK8GqnZqxhOKvXQ`
        };
        console.log(eventDetails)
        try {
            // Axios를 사용한 POST 요청
            const response = await axios.post(API_ENDPOINT, eventDetails, { headers });
            console.log(response.data);
            navigate('/content');
            // 성공 시 처리 로직
            // 예: 성공 알림 표시, 폼 초기화 
        } catch (error) {
            console.error('Event creation failed', error);
            // 실패 시 처리 로직
            // 예: 에러 메시지 표시
        }
    };
    

    return (
        <>
            <div className="mb-3 section-spacing">   
                <label className='form-label'>이벤트제목</label>                             
                <input type="text" className="form-control" placeholder="이벤트 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='mb-3 section-spacing'>
            <label className='form-label'>이벤트기간</label>
                <DateRangePicker
                    initialSettings={{ startDate: '10/5/2024', endDate: '3/6/2025' }}
                    >
                    <input type="text" className="form-control input-daterange-timepicker" />
            </DateRangePicker>
            </div>
            <div className='section-spacing'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="col-md-6 col-xl-3 col-xxl-6 mb-3">
                        <div className="color-time-picker style-1">
                            <p className="mb-1 section-spacing">활성화 시간</p>
                            <div className="time-picker-container"style={{ marginTop: '12px', marginBottom: '20px' }}>
                                <TimePicker
                                    label="Start Time"
                                    value={selectedStartTime}
                                    onChange={(newValue) => {
                                        setSelectedStartTime(dayjs(newValue));
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="End Time"
                                    value={selectedEndTime}
                                    onChange={(newValue) => {
                                        setSelectedEndTime(dayjs(newValue));
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleAddTimeRange}>시간 추가</Button>
                </LocalizationProvider>
            </div>
            <div>
                {timeRanges.map((range, index) => (
                    <div key={index} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                        {`${range.startTime} ~ ${range.endTime}`}
                        <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => {
                            setTimeRanges(timeRanges.filter((_, i) => i !== index));
                        }}>X</Button>
                    </div>
                ))}
            </div>
        <div className="mb-3">   
            <label className='form-label'>최대 참여 인원수</label>                             
            <input type="text" className="form-control" placeholder='0' value={maxCount} onChange={(e) => setMaxCount(e.target.value)} />
        </div>

        <div className="row picker-data align-items-start">			
            <div className="col-xl-3  mb-3">
                <p className="mb-1">이벤트 분류</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {getEventTypeLabel()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setEventType('RESTAURANT')}>식당</Dropdown.Item>
                            <Dropdown.Item onClick={() => setEventType('SHOPPING')}>쇼핑</Dropdown.Item>
                            <Dropdown.Item onClick={() => setEventType('CAFE')}>카페</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div> 
                <div className="col-xl-2 mb-3">
                    <p className="mb-1">보상 분류</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {getRewardTypeLabel()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setRewardType('COUPON')}>쿠폰</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRewardType('POINT')}>포인트</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRewardType('GIFT')}>사은품</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRewardType('EVENT')}>이벤트</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRewardType('ETC')}>그 외</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
            </div>
            <div className='section-spacing'>
                <label className='form-label'>내용</label>
                <div className="custom-ekeditor cms-radius add-content-ckeditor ">
                    <CkEditorBlog onChange={(data) => setEditorContent(removeHtmlTags(data))} />
                </div>
            </div>
            <p/>
            <Button className="btn btn-primary" onClick={handleEventSubmit}>이벤트 등록하기</Button>
        </>
    );
};

export default ContentAdd;