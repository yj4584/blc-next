import { GetServerSideProps } from 'next';
import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/admin/main`;
	//아래는 전체적인 예시 api, 실제 그대로 해당 api를 사용할 필요는 없음
	const apiData = await fetchSSRModule(
		context,
		{
			url: apiUrl,
			method: 'GET',
		},
		false,
	);

	if (apiData.isError == true) {
		return apiData.data;
	}
  
	let props: any = apiData.data;
	if (typeof apiData.metaInfo != 'undefined') {
		props.metaInfo = apiData.metaInfo;
	}

	return {
		props,
		// ...(!apiData.data.isAdmin && {
		// 	redirect: {
		// 		destination: '/customer',
		// 	},
		// }),
	};
};

export default function MainIndex(props:any) {
  const [currentBanner, setCurrentBanner] = useState<number>(1);
  const [isFadeIn, setIsFadeIn] = useState<boolean>(true);
  return (
    <section className="main-section">
      <div className={`main-banner banner${currentBanner} ${isFadeIn?'opacity-1':'opacity-0'}`} 
        style={{
          backgroundImage: `url(${props.banners[currentBanner-1].url})`,
          }}
      >
        {currentBanner==1 && <div className="banner-text"><span>0{currentBanner}</span> 합성목재 데크&클립<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;휀스&브라켓</div>}
        {currentBanner==2 && <div className="banner-text"><span>0{currentBanner}</span> 목조주택 건축용<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;연결철물&주춧돌</div>}
        {currentBanner==3 && <div className="banner-text"><span>0{currentBanner}</span> 공장 및 목재창고</div>}
      
        <div className="prev-btn" onClick={()=>{
          setIsFadeIn(false);
          setIsFadeIn(true);
          if(currentBanner==1) {
            setCurrentBanner(3)
          }else{
            setCurrentBanner(currentBanner-1)
          }
        }}><i className='fa-solid fa-chevron-left' /></div>
        <div className="next-btn" onClick={()=>{
          setIsFadeIn(false);
          setIsFadeIn(true);
          if(currentBanner==3) {
            setCurrentBanner(1)
          }else{
            setCurrentBanner(currentBanner+1)
          }
        }}><i className='fa-solid fa-chevron-right' /></div>
        <div className="banner-nav">
          <div className="nav-btn active">{currentBanner==1?<i className='fa-solid fa-circle'/>:<i className='fa-regular fa-circle' />}</div>
          <div className="nav-btn inactive">{currentBanner==2?<i className='fa-solid fa-circle' />:<i className='fa-regular fa-circle' />}</div>
          <div className="nav-btn inactive">{currentBanner==3?<i className='fa-solid fa-circle' />:<i className='fa-regular fa-circle' />}</div>
        </div>
      </div>
      {/* <div className="intro">introduction</div> */}
      <div className="products">
        <p className="sub-title-2">제품</p>
        <div className="menus">
        <div className="menu-wrap">
          <div className="menu-circle deck">합성목재</div>
        </div>
        <div className="menu-wrap">
          <div className="menu-circle steelwork">연결철물</div>
        </div>
        </div>
      </div>
      <div className="certificates">
        <div className="sub-title">인증서</div>
        {
          props.certificates.map((certificateItem:any, certificateIndex:number)=>{
            return <div className="certificate-image" style={{
              backgroundImage: `url(${certificateItem.url})`,
              }} key={`certificate-${certificateIndex}`}></div>
          })
        }
      </div>
    </section>
  );
}

