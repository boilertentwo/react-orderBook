import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../Context/context';
import { _2DCutForm } from '../subComponents/2DForm';
import { MainDoor } from '../subComponents/Maindoor';
import { useNavigate } from 'react-router-dom';

export function Form() {
  const navigate = useNavigate()
  const [selectedForm, setSelectedForm] = useState('');
  const [forms, setForms] = useState([]);
  const { empForm, setEmpForm, submitImages, setSubmitImages, submitStatus } = useAppContext(); 
  const [submissions, setSubmissions] = useState([]);
  const parentRef = useRef();
  const formObject = {
    'MainDoor': (imageProps, index, type) => <MainDoor image={`${imageProps}`} index={index} type={type} />,
    '_2DCutting': (imageProps, index, type) => <_2DCutForm image={`${imageProps}`} index={index} type={type} />,
  };

  useEffect(() => {
    if (submitStatus.status === 'submitted' || submitStatus.status === 'cancelled') {
      
      if (submitStatus.type === 'imageForm') {
        setSubmitImages((prevImages) => {
          const newImages = [...prevImages];
          newImages.splice(submitStatus.index, 1);
          return newImages;
        });
        setEmpForm(false);
      }
      if (submitStatus.type === 'emptyForm') {
        setForms((prevForms) => {
          const newForms = [...prevForms];
          newForms.splice(submitStatus.index, 1);
          return newForms;
        });
        setEmpForm(false);
      }
      setSubmissions((prev) => [...prev, submitStatus.status]);
      const timer = setTimeout(() => { 
       
        setSubmissions([]); }, 5000);
      return () => 
        {
          clearTimeout(timer)
         
      };
    }
  }, [submitStatus, setSubmitImages, setForms]);

  const navtor = () => {
    navigate('/server')
  }

  const appendChild = () => {
    if (selectedForm) {
      setForms([...forms, { type: selectedForm, id: forms.length }]);
      setEmpForm(true);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <select className='bg-blue-600 h-10 w-36 rounded-md font-medium' onChange={(e) => setSelectedForm(e.target.value)}>
            <option value="">Select Form</option>
            <option value="MainDoor">Main Doors</option>
            <option value="_2DCutting">2D Arts</option>
          </select>
        </div>
        <div>
          <button disabled={empForm} onClick={appendChild}><strong>+Add Form</strong></button>
        </div>
      </div>
      <div ref={parentRef} className="min-w-full flex flex-col overflow-y-auto scroll-smooth">
        {submissions.length > 0 && submissions.map((status, index) => (
          <div key={index} className={`h-12 font-medium leading-8 text-center border-2 border-slate-400 mt-2 rounded-lg w-full ${status === 'submitted' ? 'bg-green-700' : 'bg-red-700'}`}>
            <p>{status}</p>
          </div>
        ))}
        {submitImages.length > 0 && submitImages.map((obj, index) => (
          <div key={index}>{formObject[obj.key](obj.image, index, 'imageForm')}</div>
        ))}
        {forms.map((form, index) => (
          <div className='mt-2' key={form.id}>{formObject[form.type]('', index, 'emptyForm')}</div>
        ))}
      </div>
      
    </>
  );
}



