import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Forum.css";
import DoubtAsk from '../Common/DoubtAsk';
import { createQuestion } from '../../Services/Operations/courseDetailsAPI';
import { useSelector } from "react-redux";
import { getAllQuestionsAndAnswers ,createAnswer } from "../../Services/Operations/courseDetailsAPI";


const Forum = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const { courseId } = useParams();
  const { token } = useSelector(state => state.auth);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [refresh , setRefresh] = useState(false);
  const courseid = courseId.substring(1);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      try {
        const response = await getAllQuestionsAndAnswers(courseid, token);
        setQuestionsAndAnswers(response.forum);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      }
    };

    fetchQuestionsAndAnswers();
  }, [courseid, token , refresh]);


  console.log("questionsAndAnswers", questionsAndAnswers);
  const handleQuestionPost = async (text) => {

    await createQuestion(text, courseid, token);
   
    setModalData(null); 
    setRefresh(!refresh);
  };
  
  const handleAnswerPost = async (text, questionId) => {
    try {
      await createAnswer(text, questionId, token); // Assume createAnswer sends answer to backend
      setModalData(null);
      console.log("Posted Answer:", text , questionId);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error posting answer:", error);
    }

  };
  


  return (
    <div className='course-forum-wrapper'>
      <div className='course-forum-content'>
        <div className='course-forum-hearder'>
          <p>Doubt Forum</p>
          <p
            onClick={() => setModalData({
              text1: "Ask Doubt",
              text2: "Enter your doubt here...",
              btn1: "Post",
              btn2: "Cancel",
              onSubmit: handleQuestionPost,
              btn2handeler: () => setModalData(null),
            })}
          >
            Ask Doubt
          </p>
        </div>
        <div className='course-forum-body'>
              {
              questionsAndAnswers.length > 0 ? (
                questionsAndAnswers.map((eachQuestion) => (  
                  <details key={eachQuestion._id} className='course-forum-question'>
                    <summary className='course-forum-question-summary'>
                    <div className='forum-question-summary-part1'>
                       <div className='forum-question-summary-part11'>
                       <p><img src={eachQuestion.askedBy.image} style={{width:"100%" ,height:"100%"}} alt="profile"/></p>
                       </div>
                         <div className='forum-question-summary-part12'>
                             <p>{eachQuestion.question}</p>
                             <p>Asked by: {eachQuestion.askedBy.firstName} {eachQuestion.askedBy.lastName}</p>
                         </div>
                    </div>
                      
                    <div>
                      <p className='forum-question-summary-part2' 
                         onClick={() => setModalData({
                          text1: "Post Answer?",
                          text2: "Type your answer here...",
                          btn1: "Post",
                          btn2: "Cancel",
                          onSubmit: (text) => handleAnswerPost(text, eachQuestion._id),
                          btn2handeler: () => setModalData(null),
                        })}
                      >Post Answer</p>

                    </div>
                    </summary>
                    <div className='question-details'>
                      {
                        eachQuestion.answeredBy.length > 0 ? (
                          <div className='answers'>
                            {eachQuestion.answeredBy.map((answer, index) => (
                              <div key={answer._id || index} className='answer'>
                                <div>
                                    <div className='forum-question-summary-part21'>
                                    <p><img src={eachQuestion.answeredBy.image} style={{width:"100%" ,height:"100%"}} alt="profile"/></p>
                                    </div>
                                </div>
                                <div className='forum-answer-div2'>
                                  <p className='forum-question-answer'>{answer.answer}</p>
                                  <p className='forum-answer-name'>Answered by: {answer.answeredBy.firstName} {answer.answeredBy.lastName}</p>
                                </div>
                                
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p 
                           style={{textAlign:"center",marginTop:"20px",marginBottom:"20px",letterSpacing:"0.5px"}}
                          >No answers yet!!</p>
                        )
                      }
                    </div>
                  </details>
                ))
              ) : (
             <div className='course-forum-empty'>
               <p style={{textAlign:"center"}}>No Questions Found, Be the first one to ask</p>
             </div>
              )
              }
        </div>

      </div>
      {/* Pass handleQuestionPost as a separate prop */}
      {modalData && <DoubtAsk modalData={modalData}  />}
    </div>
  );
}

export default Forum;
