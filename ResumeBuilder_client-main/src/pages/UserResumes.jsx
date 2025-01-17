import React, { useEffect } from "react";
import useResume from "../hooks/useResume";
import UserResumeCards from "../components/ui/UserResumeCards";
import MainSpinner from "../components/MainSpinner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserResumes = () => {
  const { data: allResumes, isLoading } = useResume();
  const navigate = useNavigate();
  if (!isLoading && allResumes === null) {
    return <MainSpinner />;
  }
  return (
    <>
      {isLoading ? (
        <MainSpinner />
      ) : (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate="visible"
          className="min-h-screen grid grid-cols-12 gap-5 py-6 lg:gap-10 lg:py-10 lg:px-8 place-items-center place-content-start"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex md:h-[30vh] flex-col gap-2 justify-center w-[90%] px-4 py-2 lg:w-full items-center bg-violet-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md  col-span-12 md:col-span-6 lg:col-span-4"
          >
            <motion.button
              onClick={() => navigate("/templates")}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", duration: 0.3, stiffness: 800 }}
              className="w-20 h-20 text-2xl font-bold rounded-full bg-white text-violet-500"
            >
              +
            </motion.button>
            <h1 className="text-white ">Create new</h1>
          </motion.div>
          {allResumes.map((resume) => {
            return (
              <UserResumeCards
                layout
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                key={resume.id}
                Title={resume.resumeData.name || "Untitled"}
                id={resume.id}
                owner={`${
                  resume.resumeData.basicDetails?.firstName || "Anonymous"
                } ${resume.resumeData.basicDetails?.lastName || ""}`}
                templateId={resume.resumeData.templateId}
              />
            );
          })}
        </motion.div>
      )}
    </>
  );
};

export default UserResumes;
