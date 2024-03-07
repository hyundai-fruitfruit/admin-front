/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-21 16:16:05
 * @modify date 2024-02-21 16:16:05
 * @desc 이벤트 조회,삭제 기능
 */

import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { useEvents } from "../../../hooks/useEvents.jsx";
import useGetEventMembers from "hooks/useGetEventMembers.jsx";

import EventModal from "../Modal/eventmodal/EventModal.jsx";

const Content = () => {
  const { events, fetchEvents, deleteEvent } = useEvents();
  const { fetchEventMembers, members, error, loading } = useGetEventMembers();
  const [open2, setOpen2] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventIdForSpace, setSelectedEventIdForSpace] = useState(null);

  const sort = 10
  const activePag = useRef(0);
  let paggination = [1,2,3,4,5]



  // 이벤트 삭제 핸들러
  const handleDelete = async (id) => {
    if (window.confirm("이 이벤트를 삭제하시겠습니까?")) {
      await deleteEvent(id);
    }
  };

  const handleModalOpen = (id) => {
    setSelectedEventId(id);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    fetchEvents();
  };

  const toggleSpace = async (id) => {
    if (selectedEventIdForSpace === id) {
      setSelectedEventIdForSpace(null); // 이미 선택된 이벤트를 다시 클릭하면 높이 초기화
    } else {
      setSelectedEventIdForSpace(id); // 새로운 이벤트 선택시 높이 설정
      await fetchEventMembers(id);
      console.log(members);
    }
  };

  return (
    <>
      {/* <PageTitle  activeMenu={'Content'} motherMenu={"CMS"} /> */}
      <div className="row">
        <div className="col-xl-12">
          <div className="filter cm-content-box box-primary"></div>
          <div className="mb-3">
            <Link to={"/add-content"} className="btn btn-primary btn-sm">
              이벤트 등록
            </Link>
          </div>
          <div className="filter cm-content-box box-primary">
            <div className={`content-title`} onClick={() => setOpen2(!open2)}>
              <div className="cpa">
                <i className="fa-solid fa-file-lines me-2" />
                이벤트 리스트
              </div>
              <div className="tools">
                <Link to={"#"} className={`SlideToolHeader ${open2 ? "collapse" : "expand"}`}>
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
                          <tr className="text-center">
                            <th className="text-black">ID</th>
                            <th className="text-black">제목</th>
                            <th className="text-black">시작일</th>
                            <th className="text-black">종료일</th>
                            <th className="text-black">시작시간</th>
                            <th className="text-black">마감시간</th>
                            <th className="text-black">최대 인원수</th>
                            <th className="text-black">현재 참여 인원수</th>
                            <th className="text-black">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((item, ind) => (
                            <>
                              <tr key={ind} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.startedAt}</td>
                                <td>{item.finishedAt}</td>
                                <td>{item.eventActiveTimeZoneDto?.length > 0 ? item.eventActiveTimeZoneDto.map((timeZone, index) => <div key={index}>{timeZone.opennedAt} : 00</div>) : "기본값"}</td>
                                <td>{item.eventActiveTimeZoneDto?.length > 0 ? item.eventActiveTimeZoneDto.map((timeZone, index) => <div key={index}>{timeZone.closedAt} : 00</div>) : "기본값"}</td>
                                <td>{item.maxCount}</td>
                                <td onClick={() => toggleSpace(item.id)} style={{ color: "rgb(79, 70, 229)", cursor: "pointer" }}>
                                  {item.visitedCount}
                                </td>
                                <td className="">
                                  <Link to="#" className="btn btn-success btn-sm content-icon me-1" onClick={() => handleModalOpen(item.id)}>
                                    <i className="fa fa-qrcode"></i>
                                  </Link>
                                  <Link to={`/add-content/${item.id}`} className="btn btn-warning btn-sm content-icon me-1">
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                  <Link to={"#"} className="btn btn-danger btn-sm content-icon me-1" onClick={() => handleDelete(item.id)}>
                                    <i className="fa fa-times"></i>
                                  </Link>
                                </td>
                              </tr>
                              {selectedEventIdForSpace === item.id && (
                                <tr className={`${selectedEventIdForSpace === item.id ? "h-[30vh]" : "h-0"} flex flex-col justify-center`}>
                                  <td colSpan="9" className="">
                                    <div className="inline-block min-w-full py-2 align-middle rounded-2xl ">
                                      <table className="table table-responsive-lg table-condensed flip-content border rounded-2xl">
                                        <thead>
                                          <tr className="text-center" style={{ backgroundColor: "rgb(243, 244, 246)" }}>
                                            <th scope="col" className="py-3.5 text-sm font-semibold">
                                              이름
                                            </th>
                                            <th scope="col" className="py-3.5 text-sm font-semibold">
                                              생년월일
                                            </th>
                                            <th scope="col" className="py-3.5 text-sm font-semibold">
                                              이메일
                                            </th>
                                            <th scope="col" className="py-3.5 text-sm font-semibold">
                                              가입일
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                          {members?.data && members.data.length > 0 ? (
                                            members.data.map((member, index) => (
                                              <tr key={index} className="text-center">
                                                <td>{member.memberName}</td>
                                                <td>{member.memberBirth}</td>
                                                <td>{member.memberEmail}</td>
                                                <td>{member.memberJoinDate}</td>
                                              </tr>
                                            ))
                                          ) : (
                                            <tr>
                                              <td colSpan="4">참여자 정보가 없습니다.</td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                          <EventModal show={modalShow} handleClose={handleClose} eventId={selectedEventId}/>
                        </tbody>
                      </table>
                      <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                          <div className="dataTables_info">
                          </div>
                          <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="example2_paginate"
                              style={ { marginRight: '40px' }}
                          >
                              <Link
                                  className="paginate_button previous disabled"
                                  to="/content"
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
                                  >
                                      {number}
                                  </Link>
                                  ))}
                              </span>
                              <Link
                                  className="paginate_button next"
                                  to="/content"
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
  );
};
export default Content;