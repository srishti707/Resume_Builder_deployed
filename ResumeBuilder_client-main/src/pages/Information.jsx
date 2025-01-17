import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { resumeDetails } from "../utils/helpers";
import Sidebar from "../components/Sidebar";

const Information = () => {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const { templateId, resumeId, name, detail: details } = useParams();

  return (
    <main className="relative grid grid-cols-12 w-full h-screen">
      <motion.aside className="self-start hidden md:col-span-2 md:flex flex-col gap-2 sticky top-[10vh] left-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {resumeDetails.map((detail, index) => {
          return (
            <motion.button
              transition={{ type: "spring", duration: 0.5 }}
              whileHover={{ backgroundColor: "#c4b5fd", scale: 1.1 }}
              key={index}
            >
              <NavLink
                to={`/templates/${templateId}/${resumeId}/${name}/build/${detail.path}`}
                className={({ isActive }) => {
                  return isActive
                    ? "w-full h-full flex items-center justify-center px-4 py-4 bg-violet-400 text-white"
                    : "w-full h-full flex items-center justify-center px-4 py-4";
                }}
              >
                {detail.info}
              </NavLink>
            </motion.button>
          );
        })}
        <motion.button
          onClick={() => navigate(`/${templateId}/${resumeId}/preview`)}
          whileHover={{ scale: 1.05 }}
          transition={{ stiffness: 800, type: "spring" }}
          className="px-5 py-4 bg-violet-500 text-white rounded-md hover:bg-violet-600"
        >
          Generate Resume
        </motion.button>
      </motion.aside>
      <AnimatePresence>
        {expand && (
          <Sidebar
            templateId={templateId}
            resumeId={resumeId}
            name={name}
            onClose={() => setExpand(false)}
          />
        )}
      </AnimatePresence>

      {/* rendering forms here   */}
      <Outlet context={[expand, setExpand]} />
    </main>
  );
};

export default Information;
