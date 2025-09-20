import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from '../components/core/Homepage/Button' 

// import video
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import TimelineSection from '../components/core/Homepage/TimelineSection'
import LearninLanguageSection from '../components/core/Homepage/LearninLanguageSection'
import InstructorSection from '../components/core/Homepage/InstructorSection'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/Homepage/ExploreMore'

const Home = () => {
  return (
    <div>
      {/* section1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>
         
         {/* button */}
         <Link to ={"/signup"}>
           <div className='group mt-16 p-1  mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 '>
              <p>Become an Instructor</p>
              <FaArrowRight/>
            </div>
           </div>

         </Link>
          
          {/* heading */}
         <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Future with 
          <HighlightText text={" Coding Skills"} />
          
         </div>
         
          {/* sub heading */}
        <div className='mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

           {/* 2button */}
           <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
           </div>

           {/* video */}
          <div className="mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

         
         {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={" coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

          {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={" coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore Section */}
        <ExploreMore />


         
      </div>

      {/* section 2 */}

      <div className='bg-pure-greys-5 text-richblack-700'>

        <div className='homepage_bg h-[310px] '>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between '>
                    <div className='h-[150px]'></div>
                 <div className='flex flex-row gap-7 text-white'>
                      <CTAButton  active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-2'>
                          Explore Full Catalog 
                          <FaArrowRight />
                        </div>

                      </CTAButton>
                      
                      <CTAButton active={false} linkto={"/signup"} >
                          
                         <div>Learn more</div>
                      </CTAButton>
                       

                 </div>

          </div>
        

        </div>


        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center  justify-between gap-7 '>
           <div className='flex flex-row gap-5 mb-10 mt-[95px] '>
               <div  className='text-4xl font-semibold w-[45%]'>
                  Get the Skills you need for a 
                  < HighlightText text={" job that is in demand"} />

               </div>

                <div className='flex flex-col gap-10 w-[40%] items-start'>
                  <div className='text-[16px]'>
                    The modern EduNova is the dictates its own terms. Today, to 
                    be a competitive specialist require more than professional skills.

                  </div>
                  <CTAButton active={true} linkto={"signup"} >
                    <div>
                      Learn more
                    </div>
          

                  </CTAButton>
                  
                  
                  </div>   

            </div>   

        <TimelineSection />

        <LearninLanguageSection />    

                  
        </div>


      </div>

        {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>



      {/* footer */}
      <Footer />




    </div>
  )
}

export default Home