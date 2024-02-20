import React, {useState, useRef, useEffect} from 'react';
// import { DatePicker } from 'rsuite';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';
import PageTitle from '../../layouts/PageTitle';
import axios from 'axios';

const tableData = [
    {
        id: "1",
        title: "Title",
        startDate: "2024-02-18",
        endDate: "2024-02-19",
        startTime: "14:00",
        endTime: "15:00",
        maxParticipants: 100,
        currentParticipants: 5
    },
    {
        id: "2",
        title: "Title",
        startDate: "2024-02-18",
        endDate: "2024-02-19",
        startTime: "14:00",
        endTime: "15:00",
        maxParticipants: 100,
        currentParticipants: 5
    },
    {
        id: "3",
        title: "Title",
        startDate: "2024-02-18",
        endDate: "2024-02-19",
        startTime: "14:00",
        endTime: "15:00",
        maxParticipants: 100,
        currentParticipants: 5
    },
    {
        id: "4",
        title: "Title",
        startDate: "2024-02-18",
        endDate: "2024-02-19",
        startTime: "14:00",
        endTime: "15:00",
        maxParticipants: 100,
        currentParticipants: 5
    },
    {
        id: "5",
        title: "Title",
        startDate: "2024-02-18",
        endDate: "2024-02-19",
        startTime: "14:00",
        endTime: "15:00",
        maxParticipants: 100,
        currentParticipants: 5
    }
];


const Content = () =>{

    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);

    const [data, setData] = useState(
		document.querySelectorAll("#content_wrapper tbody tr")
	);

	const sort = 8;
	const activePag = useRef(0);
	const [test, settest] = useState(0);
    
	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};

    // 모든 정보 조회
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/admin/events', {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMiIsImlhdCI6MTcwNzk3MzU3MiwiZXhwIjoyMDcwODUzNTcyfQ.XwBiQxnJUzSSdhLOQQj3aKS5erufHTuIgD0mGNw576iHLZmGjc5ei8ks2MgVV6m6SvNE3EjuK8GqnZqxhOKvXQ`
                    }
                });
                const sortedData = response.data.data.events.sort((a, b) => a.id - b.id);
                setDeleteItem(sortedData);
            } catch (error) {
                console.error("API에서 데이터를 가져오는데 실패했습니다.", error);
            }
        };
    
        fetchData();
    }, []);
    
    
//    useEffect(() => {
//       setData(document.querySelectorAll("#content_wrapper tbody tr"));      
// 	}, [test]);



   activePag.current === 0 && chageData(0, sort);
  
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
   
    const [deleteItem, setDeleteItem] = useState(tableData);

    const handleDelete = ind => {
        setDeleteItem(oldValues => {
          return oldValues.filter((_, i) => i !== ind)
        })
    }
    return(
        <>            
            {/* <PageTitle  activeMenu={'Content'} motherMenu={"CMS"} /> */}
            <div className="row">
                <div className="col-xl-12">
                    <div className="filter cm-content-box box-primary">
                    </div>
                    <div className="mb-3">
                        <Link to={"/add-content"} className="btn btn-primary btn-sm">이벤트 등록</Link>
                    </div>
                    <div className="filter cm-content-box box-primary">
                        <div className={`content-title`}
                            onClick={() => setOpen2(!open2)}
                        >
                            <div className="cpa">
                                <i className="fa-solid fa-file-lines me-2" />Contact List
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open2 ? 'collapse' : 'expand' }`}
                                >
                                    <i className="fas fa-angle-up"></i>
                                </Link>
                            </div>
                        </div>
                        <Collapse in={open2}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body py-3">
                                    <div className="table-responsive order-list-table">
                                        <div id="content_wrapper" className="dataTables_wrapper no-footer">
                                            <table className="table table-responsive-lg  table-condensed flip-content">
                                                <thead>
                                                    <tr>
                                                        <th className='text-black'>id</th>
                                                        <th className='text-black'>제목</th>
                                                        <th className='text-black'>시작일</th>
                                                        <th className='text-black'>종료일</th>
                                                        <th className='text-black'>시작시간</th>
                                                        <th className='text-black'>마감시간</th>
                                                        <th className='text-black'>최대 인원수</th>
                                                        <th className='text-black'>현재 참여 인원수</th>
                                                        <th className="text-black text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {deleteItem.map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td>{item.id}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.startedAt}</td>
                                                            <td>{item.finishedAt}</td>
                                                            <td>
                                                                {item.eventActiveTimeZoneDto?.length > 0 ? (
                                                                    item.eventActiveTimeZoneDto.map((timeZone, index) => (
                                                                        <div key={index}>
                                                                        {timeZone.opennedAt} : 00
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    '기본값'
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.eventActiveTimeZoneDto?.length > 0 ? (
                                                                    item.eventActiveTimeZoneDto.map((timeZone, index) => (
                                                                        <div key={index}>
                                                                            {timeZone.closedAt} : 00
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    '기본값'
                                                                )}
                                                            </td>                                          
                                                            <td>{item.maxCount}</td>
                                                            <td>{item.visitedCount}</td>
                                                            <td className='text-end'>
                                                                <Link to={"/add-content"} className="btn btn-warning btn-sm content-icon me-1">
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <Link to={"#"} className="btn btn-danger btn-sm content-icon ms-1"
                                                                    onClick={()=>handleDelete(ind)}
                                                                >
                                                                    <i className="fa fa-times"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                                                <div className="dataTables_info">
                                                    Showing {activePag.current * sort + 1} to{" "}
                                                    {data.length > (activePag.current + 1) * sort
                                                        ? (activePag.current + 1) * sort
                                                        : data.length}{" "}
                                                    of {data.length} entries
                                                </div>
                                                <div
                                                    className="dataTables_paginate paging_simple_numbers"
                                                    id="example2_paginate"
                                                >
                                                    <Link
                                                        className="paginate_button previous disabled"
                                                        to="/content"
                                                        onClick={() =>
                                                        activePag.current > 0 &&
                                                        onClick(activePag.current - 1)
                                                        }
                                                    >
                                                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                                                    </Link>
                                                    <span>
                                                        {paggination.map((number, i) => (
                                                        <Link
                                                            key={i}
                                                            to="/content"
                                                            className={`paginate_button  ${
                                                                activePag.current === i ? "current" : ""
                                                            } `}
                                                            onClick={() => onClick(i)}
                                                        >
                                                            {number}
                                                        </Link>
                                                        ))}
                                                    </span>
                                                    <Link
                                                        className="paginate_button next"
                                                        to="/content"
                                                        onClick={() =>
                                                        activePag.current + 1 < paggination.length &&
                                                        onClick(activePag.current + 1)
                                                        }
                                                    >
                                                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                                                    </Link>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse> 
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default Content;