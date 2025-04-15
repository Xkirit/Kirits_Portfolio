import image from './assets/pfp2.png'

export default function Image(){
    return(
        <div className="wrapper-img overflow-visible ">
          {/* <div className="box"></div> */}
          <div>
          {/* <img className="image" src={image} alt="profile portrait" loading="eager" /> */}
          <div className="w-fullmd:w-full  md:left-10 lg:w-1/2 items-center justify-center">
            <img 
              className="image object-cover w-full  rounded-lg" 
              src={image} 
              alt="profile portrait" 
              loading="eager" 
            />
            </div>
          </div>
        </div>
    )
}
