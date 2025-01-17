import React, { useRef, useState } from "react";
import { formats } from "../../utils/helpers";
import Modal from "../../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

const BuildLayout = () => {
  //states
  const [hovered, setHovered] = useState({
    activeIndex: 0,
    hoveredArray: new Array(formats.length).fill(false),
  });
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  //refs
  const nameModal = useRef();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Other hooks
  const navigate = useNavigate();

  //handler functions

  //close modal
  function closeModal() {
    setPreviewModalOpen(false);
  }

  // close resume modal
  function closeResumeModal() {
    setResumeModalOpen(false);
  }

  // mouse enter handler
  function handleEnter(index) {
    setHovered((prev) => {
      const updatedArray = [...prev.hoveredArray];
      updatedArray[index] = true;
      return {
        ...prev,
        hoveredArray: updatedArray,
      };
    });
  }

  // mouse leave handler
  function handleLeave(index) {
    setHovered((prev) => {
      const updatedArray = [...prev.hoveredArray];
      updatedArray[index] = false;
      return {
        ...prev,
        hoveredArray: updatedArray,
      };
    });
  }

  // show preview handler
  function handlePreview(index) {
    setHovered((prev) => ({ ...prev, activeIndex: index }));
    setPreviewModalOpen(true);
  }

  // form submit handler
  function onSubmit(data) {
    const resumeTitle = { ...data, id: crypto.randomUUID() };
    setResumeModalOpen(false);
    navigate(
      `${formats[hovered.activeIndex].id}/${resumeTitle.id}/${
        resumeTitle.name
      }/build/basicdetails`
    );
  }

  // JSX
  return (
    <motion.main className="min-h-screen w-full grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4 place-items-center">
      {formats.map((format, index) => {
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            key={format.id}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={() => handleLeave(index)}
            className="w-full md:w-[75%] flex flex-col justify-center items-center gap-5 p-3 rounded-md relative"
          >
            <img className="h-full shadow-lg" src={format.img} />
            {hovered.hoveredArray[index] && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-10 rounded-md hidden lg:flex flex-col justify-center items-center"
              >
                <motion.button
                  whileHover={{ backgroundColor: "#8b5cf6" }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setResumeModalOpen(true)}
                  className="bg-white px-4 py-2 text-xs md:text-base rounded-md m-2 flex justify-center items-center hover:text-white"
                >
                  Create
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "#8b5cf6" }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handlePreview(index)}
                  className="bg-white px-4 py-2 text-xs md:text-base rounded-md m-2 flex justify-center items-center hover:text-white"
                >
                  Preview
                </motion.button>
              </motion.div>
            )}
            <button
              className="flex lg:hidden px-4 py-2 bg-green-500 rounded-md text-white"
              onClick={() => setResumeModalOpen(true)}
            >
              Use template
            </button>
            <button
              onClick={() => handlePreview(index)}
              className="flex lg:hidden px-4 py-2 bg-amber-500 rounded-md text-white"
            >
              Preview
            </button>
            <h1 className="hidden lg:block text-xl font-bold ">
              {format.formatName}
            </h1>
            <AnimatePresence>
              {resumeModalOpen && (
                <Modal isOpen={resumeModalOpen} onClose={closeResumeModal}>
                  <motion.div className=" w-[350px] lg:w-[500px] p-10 flex flex-col gap-4">
                    <form
                      className="w-full flex flex-col gap-5"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <label className="text-sm lg:text-base text-gray-500 font-mooli font-semibold ">
                        Enter a title for your resume
                      </label>
                      <input
                        className="text-sm lg:text-base px-5 py-2 border-2 border-gray-200 outline-none rounded-md"
                        placeholder="My first Resume"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Resume title is required",
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs">
                          {errors.name.message}
                        </p>
                      )}
                      <button className="px-4 py-2 bg-violet-500 text-white rounded-md w-full lg:w-1/2 self-end text-center">
                        Create Resume
                      </button>
                    </form>
                  </motion.div>
                </Modal>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {previewModalOpen && (
                <Modal isOpen={previewModalOpen} onClose={closeModal}>
                  <section className="lg:h-screen">
                    <img
                      className="lg:h-full"
                      src={formats[hovered.activeIndex]?.img}
                      alt="formats"
                    />
                  </section>
                </Modal>
              )}
            </AnimatePresence>
          </motion.section>
        );
      })}
    </motion.main>
  );
};

export default BuildLayout;
