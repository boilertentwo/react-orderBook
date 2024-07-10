import { useAuth } from "../../utils/authContext";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Details() {
  const { userDetails, updateDetails } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userDetails.name || userDetails.email) {
      navigate('/');
    }
  }, [userDetails, navigate]);

  const setDetails = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await updateDetails(data.username, data.email, data.password);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-950 to-blue-300">
      <form onSubmit={handleSubmit(setDetails)} className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block text-blue-700 font-bold mb-2" htmlFor="username">Choose a name:</label>
          <input 
            type="text" 
            id='username'  
            {...register('username', { required: true })} 
            className="w-full px-3 py-2 border rounded"
          />
          {errors.username && <p className="text-red-500 text-xs italic">Username is required!</p>}
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold mb-2" htmlFor="email">Your Email:</label>
          <input 
            type="email" 
            id="email" 
            {...register('email', { required: true })} 
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-xs italic">Email is required!</p>}
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold mb-2" htmlFor="password">Password:</label>
          <input 
            type='password' 
            id='password' 
            {...register('password', { required: true })} 
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-xs italic">Password is required!</p>}
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button 
          type='submit' 
          className={`w-full px-4 py-2 font-bold text-white ${loading ? 'bg-gray-600' : 'bg-black'} rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
