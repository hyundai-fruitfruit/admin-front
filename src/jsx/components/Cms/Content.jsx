/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-21 16:16:05
 * @modify date 2024-02-21 16:16:05
 * @desc 이벤트 조회,삭제 기능
 */

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import { useEvents } from '../../../hooks/useEvents.jsx'

const Content = () =>{
    const { events,deleteEvent } = useEvents();
    const [open2, setOpen2] = useState(true);
    
    // 이벤트 삭제 핸들러
    const handleDelete = async (id) => {
        if (window.confirm('이 이벤트를 삭제하시겠습니까?')) { 
            await deleteEvent(id); 
        }
    };


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
                                <i className="fa-solid fa-file-lines me-2" />이벤트 리스트
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
                                            <table className="table table-responsive-lg table-condensed flip-content">
                                                <thead>
                                                    <tr>
                                                        <th className='text-black'>ID</th>
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
                                                    {events.map((item, ind) => (
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
                                                                <Link to={`/add-content/${item.id}`} className="btn btn-warning btn-sm content-icon me-1">
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <Link to={"#"} className="btn btn-danger btn-sm content-icon ms-1"
                                                                    onClick={()=>handleDelete(item.id)}
                                                                >
                                                                    <i className="fa fa-times"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
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