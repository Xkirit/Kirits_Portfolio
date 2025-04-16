import image from './assets/pfp2.png'

export default function Image(){
    return(
        <div className="wrapper-img mb-10 flex justify-center items-start overflow-visible ">
          {/* <div className="box"></div> */}
          <div>
          {/* <img className="image" src={image} alt="profile portrait" loading="eager" /> */}
          
          <div className='w-full flex justify-center items-start'>
          <div className="w-1/2 flex lg:mb-10 right-10 md:w-1/2  md:left-10 lg:w-[275px] items-center justify-center">
            <img 
              className="image mb-10 flex object-cover w-full justify-center items-start rounded-lg" 
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
