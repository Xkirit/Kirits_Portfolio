
import image from './assets/pfp2.png'

export default function Image(){
    return(
        <div className="wrapper-img">
          <div className="box"></div>
          <div>
            <img className="image" src={image} alt="image" />
          </div>
        </div>
    )
}
