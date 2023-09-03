import { deckClip } from "data/deckClip";

export default function Deck() {
  return (
    <section className="wood-section">
      <div className="title-area">
        <p className="title">합성목재</p>
      </div>
      <div className="sub-title">데크&클립</div>
      <div className="image"></div>
      <p className="text-center">비엘텍크라스노의 데크 제품을 소개합니다.</p>
      <div className="sub-title">데크 소재</div>
      <div className="image-area">사진</div>
      <div className="image-area">사진</div>
      <div className="image-area">사진</div>
      <div className="sub-title">연결 클립</div>
      <div className="info-area">
        {deckClip.map((item, index) => {
          return (
            <div className="item" key={index}>
              <p className="item-title">{item.name}</p>
              <div className="item-image-area">
                {item.images.map((image, index) => {
                  return (
                    <div className="image-row">
                      <div
                        className="item-image"
                        style={{
                          backgroundImage: image,
                        }}
                      ></div>
                      <div
                        className="item-image"
                        style={{
                          backgroundImage: item.drafts[index],
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              <table>
                <thead>
                  <tr>
                    <th>품명</th>
                    <th>사용높이</th>
                    <th>재료두께</th>
                    <th>재료명</th>
                  </tr>
                </thead>
                <tbody>
                  {item.info.map((infoItem, infoIndex) => {
                    return (
                      <tr key={infoIndex}>
                        <td>{infoItem.prodName}</td>
                        <td>{infoItem.height}</td>
                        <td>{infoItem.thickness}</td>
                        <td>{infoItem.material}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </section>
  )
}
