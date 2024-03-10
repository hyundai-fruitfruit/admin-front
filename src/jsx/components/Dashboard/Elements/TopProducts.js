import React from 'react';
import {Dropdown} from 'react-bootstrap';

//images

import mac from './../../../../images/store/macj.png'
import northface from './../../../../images/store/northface.png'
import kangol from './../../../../images/store/kangol.png'
import simons from './../../../../images/store/simons2.png'
import godiva from './../../../../images/store/godiva (1).png'
import skechers from './../../../../images/store/skechers.png'

import LineChartCanvas from './LineChartCanvas';


const timeline = [
  { storeName: '스케쳐스', title: '지금 스케쳐스로 가볼까?',demo :'image', image: skechers },
  { storeName: '노스페이스', title: '봄 맞이 할인 이벤트', demo :'image',image: northface },
  { storeName: '캉골', title: '3월 생일자 이벤트', demo :'image',image: kangol },
  { storeName: '시몬스', title: '신혼부부 방문 이벤트', demo :'image',image: simons },
  { storeName: '고디바', title: '화이트데이 이벤트', demo :'image',image: godiva },
  { storeName: 'MAC', title: '퍼스널 컬러 진단 이벤트', demo :'image',image: mac },
];

// 현재 날짜
const currentDate = new Date().toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const TopProducts = () =>{
	return(
		<>
			<div className="card-body"> 
				<div className="widget-media">
					<ul className="timeline">
						{timeline.map((data , ind)=>(
							<li key={ind}>
								<div className="timeline-panel">
									{
									    data.demo === "image" ? 
											<div className="media me-2">
												<img alt={data.storeName} width="50" src={data.image} />
											</div>
										:
										data.demo === "name" ?
											<div className="media me-2 media-info">
												KG
											</div>
										:
										data.demo === "icon" ? 
											<div className="media me-2 media-success">
												<i className="fa fa-home" />
											</div>
										:
										""
									}
									<div className="media-body">
										<h5 className="mb-1 text-white">[{data.storeName}] - {data.title}</h5>
										<small className="d-block">{currentDate}</small>
									</div>
								</div>
							</li>
						
						))}												
					</ul>
				</div>
			</div>	
			<LineChartCanvas />	
		</>
	)
}
export default TopProducts;