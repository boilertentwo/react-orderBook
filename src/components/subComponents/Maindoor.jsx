import { useState, useEffect, useRef } from 'react';
import { Client, Databases, ID } from 'appwrite';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../../Context/context';
import { useAuth } from '../../utils/authContext';


const unitConversion = {
    mm: 1,
    cm: 10,
    in: 25.4,
  };
  
  function convertUnit(value, fromUnit, toUnit) {
    return (value * unitConversion[fromUnit]) / unitConversion[toUnit];
  }

  function rateCalculator(data){
    let value;
    switch(data.finishing){
        case '3mm':
          value = 400;
          break;
        case '4mm':
          value = 350;
          break;
        case '5mm':
          value = 300;
          break;
        default:
          value=250;
          break;
    }
    const rate = (data.length*data.breadth*value)/(92903.04)
    return data.handfinish?(rate+1350):rate;
  }

export function MainDoor({image,index,type}){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [lengthUnit, setLengthUnit] = useState('mm');
    const [breadthUnit, setBreadthUnit] = useState('mm');
    const [borderUnit, setBorderUnit] = useState('mm');
    const [formStatus, setFormStatus] = useState(null); 
    const { setSingleImage,scrollToGallery,setImageCall,singleImage,setEmpForm, setSubmitStatus, setGalleryLink } = useAppContext();
    const {userDetails} = useAuth()
    const [rate, setRate] = useState(null)
    const [data, setData] = useState({})
    const [loading,setLoading] = useState(false)

    const [dbImage, setDbImage] = useState('')

    const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

    const databaseMD = new Databases(client);
    const modelRef = useRef();

    useEffect(()=>{     
      if(!image)
        {
          setDbImage(singleImage)
        }
      else{
        setDbImage(image)
      }
    },[singleImage])

    const onSubmit = (data) => {
      const lengthInMM = convertUnit(parseFloat(data.length), data.lengthUnit, 'mm');
      const breadthInMM = convertUnit(parseFloat(data.breadth), data.breadthUnit, 'mm');
      const borderInMM = convertUnit(parseFloat(data.border), data.borderUnit, 'mm');
      const finishinMM = parseInt(data.finishing)
      const submissionData = {
        userID: `${userDetails.$id}`,
        model: 'Maindoor',
        username: `${userDetails.name}`,
        design: dbImage,
        length: lengthInMM,
        breadth: breadthInMM,
        border: borderInMM,
        Material:'WOOD',
        'hand-finish': data.handfinish,
        finishing: finishinMM,
        datenow: new Date().toISOString(),
      };
  
      const calculatedRate = rateCalculator(submissionData);
      setRate(calculatedRate);
      setData({ ...submissionData, rate: calculatedRate });
    };
    

    const sendData = async () => {
      setLoading(true)
        try {
          await databaseMD.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASEID, 
            import.meta.env.VITE_APPWRITE_ORDER_COLLECT, 
            ID.unique(), 
            data,
          );
          setFormStatus('submitted');
          reset(); 
          if(!image){
            setDbImage('');
            setSingleImage('');
          }
          setRate(null)
          setSubmitStatus({ type, status: 'submitted', index }); 
        } catch (error) {
          console.error('Error creating document:', error);
        }
      setLoading(false)
      };
    
      const handleCancel = () => {
        setSubmitStatus({ type, status: 'cancelled', index });
        
        setFormStatus('cancelled');
        reset();
        setRate(null)
        if(!image){
          setDbImage('');
          setSingleImage('');
        }
      };

      const getSingleImage=()=>{
        setImageCall(true)
        setGalleryLink('/maindoors')
        scrollToGallery();
  }
  
    
    return(
        <form className='p-3 border-2 border-blue-950 rounded-md italic' onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between m-2">
        <div ref={modelRef} className="m-2 w-1/2 m-h-16">
        {image?<img src={`${import.meta.env.VITE_IMAGE_URL}${image}`} alt="" />:singleImage?<img src={`${import.meta.env.VITE_IMAGE_URL}${singleImage}`} alt="" />:<div onClick={getSingleImage} className='relative self-center size-full content-center border-2 border-white'>   <p onClick={getSingleImage} className='absolute inset-0 flex items-center justify-center text-white'>Click for image</p>
    </div>}
        </div>
        <div className="w-1/2 flex flex-col justify-around">
          <div>
            <label>Height:</label><br/>
            <input className='w-24' type="number" {...register('length', { required: true })} />
            <select {...register('lengthUnit')} defaultValue={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.length && <p className="text-red-500">Length is required</p>}
          </div>
          <div>
            <label>Width:</label><br/>
            <input className='w-24' type="number" {...register('breadth', { required: true })} />
            <select {...register('breadthUnit')} defaultValue={breadthUnit} onChange={(e) => setBreadthUnit(e.target.value)}>
               <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.breadth && <p className="text-red-500">Breadth is required</p>}
          </div>
          <div>
            <label>Border:</label><br/>
            <input className='w-24' type="number" {...register('border', { required: true })} />
            <select {...register('borderUnit')} defaultValue={borderUnit} onChange={(e) => setBorderUnit(e.target.value)}>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.border && <p className="text-red-500">Border is required</p>}
          </div>
          <div><br/>
            <label htmlFor="">Finishing:</label>
            <select {...register('finishing', { required: true })}>
              <option value="3">3mm</option>
              <option value="4">4mm</option>
              <option value="5">5mm</option>
              <option value="6">6mm</option>
              <option value="8">8mm</option>
              <option value="10">10mm</option>
            </select>
            {errors.finishing && <p className="text-red-500">Finish is required</p>}
          </div><br/>
          <div>
            <label>Hand-Finish</label>
            <input 
              type="checkbox" 
              {...register('handfinish')} 
            />
          </div>
        </div>
      </div>
      <div className='h-14 content-center text-center rounded-lg border-b-2 border-slate-500 '>
        <button disabled={!rate || {loading}} onClick={sendData}  className={`size-full ${rate ? 'bg-green-500' : ''}`} >{loading?<p>booking...</p>:rate ? <p>{rate.toFixed(2)}.Rs</p> : <p className='text-slate-400 '>Price</p>}</button>
        </div>
      <div className="flex flex-row m-2">
        <div className="w-1/2 text-center cursor-pointer m-1 active:bg-red-500" onClick={handleCancel}><strong>Cancel</strong></div>
        <div className="w-1/2 text-center border-l-2 border-slate-500 rounded-lg m-1"><strong><button disabled={!dbImage} type='submit'>Get Quotes</button></strong></div>
      </div>
    </form>
  );
}
