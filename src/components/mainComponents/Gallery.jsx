import React, { useState, useEffect, useReducer } from 'react';
import { useAppContext } from '../../Context/context';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  galleryImages: [],
  isLoading: false,
  error: null,
  bufferImg: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        galleryImages: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: 'Error while fetching images from server',
      };

    case 'TOGGLE_IMAGE':
        const newBufferImg = state.bufferImg.some(item => item.image === action.payload.image)
          ? state.bufferImg.filter(item => item.image !== action.payload.image)
          : [...state.bufferImg, action.payload];
        return {
          ...state,
          bufferImg: newBufferImg,
        };
      
     
    case 'INIT_BUFFER_IMG':
      return {
        ...state,
        bufferImg: action.payload,
      };
    case 'RESET_BUFFER_IMG':
      return {
        ...state,
        bufferImg: [],
        galleryImages: []
      };
    case 'UNLOAD_IMAGES':
      return{
        ...state,
        galleryImages: []
      }
    default:
      throw new Error();
  }
}

export function Gallery() {
  const { imageCall,setImageCall,setSingleImage, galleryLink, setGalleryLink, scrollToGallery, setSubmitImages, scrollToQuotation } = useAppContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    const fetchingImages = async () => {
      dispatch({ type: 'FETCH_INIT' });
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_IMAGE_URL}${galleryLink}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data.images });
        setKey(response.data.key)
        
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      } 
    };

    if (galleryLink) {
     
      fetchingImages();
      
    }
  }, [galleryLink]);

  useEffect(() => {
    const savedBufferImg = JSON.parse(Cookies.get('bufferImg') || '[]');
    dispatch({ type: 'INIT_BUFFER_IMG', payload: savedBufferImg });
  }, []);

  useEffect(() => {
    Cookies.set('bufferImg', JSON.stringify(state.bufferImg), { expires: 7 });
  }, [state.bufferImg]);

  const handleSubmit = async () => {
   
    
    try {
      setSubmitImages(state.bufferImg);
     
      dispatch({ type: 'RESET_BUFFER_IMG' });
      Cookies.remove('bufferImg');
      dispatch({ type: 'FETCH_SUCCESS', payload: [] });
      setGalleryLink('')
      
    } catch (error) {
      console.error('Error submitting images:', error);
    }
    scrollToQuotation();

  };

  return (
    <>
      <div className='min-w-full flex flex-row justify-between'>
          <input className='w-96 rounded-lg h-10 mb-2' type="text" />
          <button onClick={()=>{
            setGalleryLink(null)
            dispatch({type: 'UNLOAD_IMAGES'})
          }} className='w-16 h-10 ml-2 content-center rounded-lg font-medium active:bg-sky-600'><img className='size-10' src="src/assets/refresh-svgrepo-com.svg" alt="" /></button>
          
      </div>
      {state.isLoading ? (
        <div className="self-center size-full content-center">
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : state.error ? (
        <div className="self-center size-full content-center">
          <h1 className="text-center">{state.error}</h1>
        </div>
      ) : state.galleryImages.length > 0 ? (
        <div className='h-5/7 overflow-y-auto scroll-smooth snap-mandatory snap-y'>
          {state.galleryImages.map((image, index) => (
            <div
              className='snap-start snap-always'
              key={index}
              onClick={() =>{
                if(imageCall){setSingleImage(`${image}`)
                              setImageCall(false)
                              dispatch({type:'UNLOAD_IMAGES'})
                              scrollToQuotation()
                            }
                else{
                  dispatch({ type: 'TOGGLE_IMAGE', payload: { image, key } })
                }
                
              }
            }
              
            >
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${image}`}
                alt={`Image ${index + 1}`}
                style={{
                  border: state.bufferImg.some(item => item.image === image && item.key === key)
                    ? '4px solid #00abf0'
                    : 'none',
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="self-center size-full content-center">
          <h1 className="text-center">Choose a model</h1>
        </div>
      )}
      {state.bufferImg.length > 0 && (
        <button
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-400 text-white rounded shadow hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit ({state.bufferImg.length})
        </button>
      )}
    </>
  );
}
