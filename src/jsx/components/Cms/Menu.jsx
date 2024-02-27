/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-26 11:03:50
 * @modify date 2024-02-26 11:03:50
 * @desc 흰디 레벨별 쿠폰 리스트
 */

import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';
import PageTitle from '../../layouts/PageTitle';
import { Table } from 'react-bootstrap';


const options = [
    { value: '2', label: 'Published' },
    { value: '3', label: 'Draft' },
    { value: '4', label: 'Trash' },
    { value: '5', label: 'Private' },
    { value: '6', label: 'Pending' }
]


const tableData = [
    {number:"1", level:"0~1",content:"5만원 이상 구매시 10% 할인"},
    {number:"2", level:"1~2",content:"5만원 이상 구매시 10% 할인"},
    {number:"3", level:"2~3",content:"5만원 이상 구매시 10% 할인"},
    {number:"4", level:"3~4",content:"5만원 이상 구매시 10% 할인"},
    {number:"5", level:"4~5",content:"5만원 이상 구매시 10% 할인"},
    {number:"6", level:"5~6",content:"5만원 이상 구매시 10% 할인"},
    {number:"7", level:"6~7",content:"5만원 이상 구매시 10% 할인"},
    {number:"8", level:"7~8",content:"5만원 이상 구매시 10% 할인"},
    {number:"9", level:"8~9",content:"5만원 이상 구매시 10% 할인"},
    {number:"10", level:"9~10",content:"5만원 이상 구매시 10% 할인"},
];

const Menu = () =>{
    const [open2, setOpen2] = useState(true);

    const [data, setData] = useState(
		document.querySelectorAll("#content_wrapper tbody tr")
	);

	const [test, settest] = useState(0);
    

   useEffect(() => {
      setData(document.querySelectorAll("#content_wrapper tbody tr"));      
	}, [test]);

    const [deleteItem, setDeleteItem] = useState(tableData);
    const handleDelete = ind => {
        setDeleteItem(oldValues => {
          return oldValues.filter((_, i) => i !== ind)
        })
    }
    return(
        <>            
        <div className="row">
            <div className="col-xl-12">
                <div className="filter cm-content-box box-primary">
                    <div className="content-title" onClick={() => setOpen2(!open2)}>
                        <div className="cpa">
                            <i className="fa-solid fa-file-lines me-2" />흰디 레벨별 쿠폰 리스트
                        </div>
                        <div className="tools">
                            <Link to="#" className={`SlideToolHeader ${open2 ? 'collapse' : 'expand'}`}>
                                <i className="fas fa-angle-up"></i>
                            </Link>
                        </div>
                    </div>
                    <Collapse in={open2}>
                        <div className="cm-content-body form excerpt">
                            <div className="card-body py-3">
                                <Table bordered hover responsive="lg">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Level</th>
                                            <th>쿠폰이름</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, ind) => (
                                            <tr key={ind}>
                                                <td>{item.number}</td>
                                                <td>{item.level}</td>
                                                <td>{item.content}</td>
                                                <td>
                                                <Link className="btn btn-warning btn-sm content-icon me-1">
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <Link className="btn btn-danger btn-sm content-icon ms-1">
                                                                    <i className="fa fa-times"></i>
                                                                </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>
            
        </>
    )
}
export default Menu;