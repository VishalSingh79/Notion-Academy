import React from 'react';
import { useForm } from 'react-hook-form';
import "./DoubtAsk.css";

const DoubtAsk = ({ modalData}) => { 
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleFormSubmit = (data) => {
    modalData.onSubmit(data.doubt); 
    reset(); 
  };

  return (
    <div className='doubt-modal'>
      <div className='doubt-modal-content'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h2>{modalData.text1}</h2>
          <textarea 
            placeholder={modalData.text2} 
            {...register('doubt', { required: "Doubt is required**" })} 
            className='forum-textarea'
          />
          {errors.doubt && <p>{errors.doubt.message}</p>}
          <div className='btns'>
            <button type='submit' className='btn' style={{ backgroundColor: "#F8CF09" }}>Post</button>
            <button type='button' onClick={modalData.btn2handeler} className='btn'>Cancel</button>
          </div>
        </form>
      </div>  
    </div>
  );
}

export default DoubtAsk;
