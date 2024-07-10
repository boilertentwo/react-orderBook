import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../Context/context";
import PropTypes from "prop-types";
import axios from "axios";


function HomeLinker({ thumbLink, thumbName }) {
  const [imagesPath, setImagesPath] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { setGalleryLink, scrollToGallery, galleryLink } = useAppContext();

  useEffect(() => {
    const fetchingImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_IMAGE_URL}${thumbLink}`);
      
        setImagesPath(response.data.images || []); 
      } catch (error) {
        console.log('Error while fetching images from server', error);
        setImagesPath([]);
      } finally {
        setLoading(false); 
      }
    };
    fetchingImages();
  }, [thumbLink]);


  return (
    <div className="min-w-full h-48 my-1 p-0 rounded-tr-lg flex flex-col justify-around">
      <div className="min-w-full h-auto flex flex-row justify-between items-center">
        <h2 className=" text-2xl leading-relaxed text-slate-300  font-sans font-normal ">{thumbName}</h2>
        
        <button onClick={() => {
            setGalleryLink(`${thumbLink}`);
            scrollToGallery();
          }}  className=" w-16 active:text-sky-300">more</button>
       
      </div>
      {loading ? (
        <div className="h-36 min-w-full flex justify-center items-center">
          <div className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <div 
          onClick={() => {
            setGalleryLink(thumbLink);
            scrollToGallery();
          }} 
          className="h-36 min-w-full flex flex-row overflow-x-auto scroll-mx-px snap-x snap-mandatory"
        >
          {imagesPath.slice(0, 7).map((path, index) => (
            <div 
              key={index} 
              className="min-h-24 min-w-24 bg-cover bg-center bg-slate-900 mx-1 rounded-lg snap-start snap-always "
              style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL}${path})` }}
            >
            
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

HomeLinker.propTypes = {
  thumbLink: PropTypes.string.isRequired,
  thumbName: PropTypes.string.isRequired,
};

export default HomeLinker;


