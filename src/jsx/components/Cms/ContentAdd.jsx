import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button, Collapse } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import NoImage from '../../../images/no-image.jpg';
import CkEditorBlog from '../Forms/CkEditor/CkEditorBlog';
import PageTitle from '../../layouts/PageTitle';

import './ContentAdd.css'

const ContentAdd = () => {
    const [title, setTitle] = useState(''); // 이벤트 제목
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const [file, setFile] = useState(null);

    const fileHandler = (e) => {       
        setFile(e.target.files[0]);		
    };

    return (
        <>
            <div className="mb-3">   
                <label className='form-label'>이벤트제목</label>                             
                <input type="text" className="form-control" placeholder="이벤트 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label className='form-label'>Description</label>
                <div className="custom-ekeditor cms-radius add-content-ckeditor ">
                    <CkEditorBlog />
                </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label className='form-label'>Description</label>
                <div className="custom-ekeditor cms-radius add-content-ckeditor ">
                    <CkEditorBlog />
                </div>  
            </div>
            <div className = "custom-datepicker" style={{ marginBottom: '20px', width: '200%',padding: '8px' }}>
            <label className='form-label'>이벤트기간</label>
            <div/>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      const [start, end] = update;
                      setStartDate(start);
                      setEndDate(end);
                    }}
                    isClearable={true}
                    placeholderText="Select a date range"
                />
            </div>
            <Button className="btn btn-primary" style={{ marginTop: '10px' }}>이벤트 등록하기</Button> 
        </>
    );
};

export default ContentAdd;
