import { useRef, useState, useEffect } from 'react';
import Linker from './components/mainComponents/Linker';
import { Gallery } from './components/mainComponents/Gallery';
import { Form } from './components/mainComponents/Form'
import { AppContextProvider, useAppContext } from './Context/context';
import { useAuth } from './utils/authContext';
import GeolocationComponent from './components/mainComponents/Map';
import { Payment } from './components/mainComponents/Payment';
import { Profile } from './components/mainComponents/Profile';
// import { HomeSVG } from './assets/home-svgrepo-com.svg?react'

function Home() {
  const homeRef = useRef();

  const galleryRef = useRef();
  const quotationRef = useRef();
  const paymentRef = useRef();
  const logoRef = useRef();
  const [galleryLink, setGalleryLink] = useState('')
  const [formLinks, setFormLinks] = useState([]);
  const [submitImages , setSubmitImages] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({})
  const [empForm,setEmpForm] = useState(false)
  const [singleImage , setSingleImage] = useState('')
  const [imageCall , setImageCall]=useState(false)



  const scrollToHome = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
    
  };
  const scrollToGallery = () => {
    galleryRef.current.scrollIntoView({ behavior: 'smooth' });
 
  };
  const scrollToQuotation = () => {
    quotationRef.current.scrollIntoView({ behavior: 'smooth' });
    
  };
  const scrollToPayment = () => {
    paymentRef.current.scrollIntoView({ behavior: 'smooth' });
    
  };

  return (
    <AppContextProvider value={{imageCall,setImageCall,singleImage,setSingleImage,empForm,setEmpForm,submitStatus,setSubmitStatus,scrollToGallery, scrollToQuotation, scrollToPayment,formLinks,submitImages, setSubmitImages, galleryLink ,setGalleryLink}}>
    <div className='bg-gradient-to-r from-indigo-950 to-indigo-300 font-sans text-lg  font-bold md:mx-48'>
      <div className="h-24 min-w-full static top-0 rounded text-center flex flex-row justify-center  ">
                     
            <h1 className='italic overline content-center text-black font-serif text-4xl font-black'>.orderBook</h1>
           
           
      </div>
      <div className="h-screen w-auto flex flex-row overflow-x-auto scroll-smooth snap-x snap-mandatory mx-2 mt-3 p-1 mb-16">
        <div ref={homeRef} className="min-h-full min-w-full mx-1 pt-3 snap-center snap-always overflow-y-auto scroll-smooth">
          <Linker></Linker>
        </div>
        <div ref={galleryRef} className="min-h-full min-w-full pt-3 static overflow-y-auto mx-1 snap-center snap-always">
          <Gallery></Gallery>
        </div>
        <div
          ref={quotationRef}
          className="min-h-full min-w-full pt-3 mx-1 overflow-y-auto scroll-smooth snap-center snap-always "
          > 
          <Form></Form>
      
        </div>
        <div ref={paymentRef} className="min-h-full pt-3  min-w-full mx-1  overflow-y-auto scroll-smooth snap-center snap-always flex flex-col ">
                 {/* <GeolocationComponent></GeolocationComponent> */}
                 {/* <Payment></Payment> */}
                 <Profile></Profile>
                
        </div>
      </div>
      <div className="h-16 min-w-full font-medium fixed bottom-0 bg-gradient-to-r from-indigo-950 to-indigo-300  flex flex-row justify-around ">
        <button  onClick={scrollToHome}><img src="src/assets/home-page-svgrepo-com.svg" alt="home" className='w-8 stroke-white pb-1' /></button>
        <button  onClick={scrollToGallery}><img src="src/assets/picture-svgrepo-com (1).svg" alt="home" className='w-8' /></button>
        <button  onClick={scrollToQuotation}><img src="src/assets/columns-4-svgrepo-com.svg" alt="home" className='w-9' /></button>
        <button  onClick={scrollToPayment}><img src="src/assets/user-svgrepo-com.svg" alt="home" className='w-9' /></button>
      </div>
    </div>
    </AppContextProvider>
    
  );
}

export default Home;
