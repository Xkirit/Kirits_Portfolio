import image from './assets/pfp2.png'

export default function Image(){
    return(
        <div className="wrapper-img flex justify-center items-center overflow-visible ">
          {/* <div className="box"></div> */}
          <div>
          {/* <img className="image" src={image} alt="profile portrait" loading="eager" /> */}
          
          <div className='w-full flex justify-center items-center'>
          <div className="w-1/2 flex right-10 md:w-1/2  md:left-10 lg:w-[250px] items-center justify-center">
            <img 
              className="image flex object-cover w-full justify-center items-center rounded-lg" 
              src={image} 
              alt="profile portrait" 
              loading="eager" 
            />
            </div>
          </div>
        </div>
        </div>
    )
}
