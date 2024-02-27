/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-21 16:16:05
 * @modify date 2024-02-21 16:16:05
 * @desc 이벤트 조회,삭제 기능
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { useEvents } from "../../../hooks/useEvents.jsx";

import EventModal from "../Modal/eventmodal/EventModal.jsx";

const Content = () => {
  const { events, deleteEvent } = useEvents();
  const [open2, setOpen2] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventIdForSpace, setSelectedEventIdForSpace] = useState(null);

  const people = [
    {
      name: "Jane Doe",
      title: "Software Engineer",
      email: "jane.doe@example.com",
      role: "Developer",
    },
    {
      name: "John Smith",
      title: "Product Manager",
      email: "john.smith@example.com",
      role: "Management",
    },
    {
      name: "Alice Johnson",
      title: "UI/UX Designer",
      email: "alice.johnson@example.com",
      role: "Design",
    },
    {
      name: "Bob Brown",
      title: "DevOps Specialist",
      email: "bob.brown@example.com",
      role: "Operations",
    },
    {
      name: "Carol King",
      title: "Marketing Director",
      email: "carol.king@example.com",
      role: "Marketing",
    },
    {
      name: "Bob Brown",
      title: "DevOps Specialist",
      email: "bob.brown@example.com",
      role: "Operations",
    },
  ];

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

  const toggleSpace = (id) => {
    if (selectedEventIdForSpace === id) {
      setSelectedEventIdForSpace(null); // 이미 선택된 이벤트를 다시 클릭하면 높이 초기화
    } else {
      setSelectedEventIdForSpace(id); // 새로운 이벤트 선택시 높이 설정
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
                                <td onClick={() => toggleSpace(item.id)}>{item.visitedCount}</td>
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
                                    <div className="inline-block min-w-full py-2 align-middle">
                                      <table className="table table-responsive-lg table-condensed flip-content border">
                                        <thead>
                                          <tr className="text-center">
                                            <th scope="col" className="py-3.5 text-sm font-semibold text-gray-900">
                                              Name
                                            </th>
                                            <th scope="col" className="py-3.5 text-sm font-semibold text-gray-900">
                                              Title
                                            </th>
                                            <th scope="col" className="py-3.5 text-sm font-semibold text-gray-900">
                                              Email
                                            </th>
                                            <th scope="col" className="py-3.5 text-sm font-semibold text-gray-900">
                                              Role
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                          {people.map((person) => (
                                            <tr key={person.email} className="text-center">
                                              <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 sm:pl-6">{person.name}</td>
                                              <td className="whitespace-nowrap py-4 text-sm text-gray-500">{person.title}</td>
                                              <td className="whitespace-nowrap py-4 text-sm text-gray-500">{person.email}</td>
                                              <td className="whitespace-nowrap py-4 text-sm text-gray-500">{person.role}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                          <EventModal show={modalShow} handleClose={() => setModalShow(false)} eventId={selectedEventId} />
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
  );
};
export default Content;
