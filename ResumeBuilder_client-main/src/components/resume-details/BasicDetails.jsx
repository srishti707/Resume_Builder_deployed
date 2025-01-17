import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import useUser from "../../hooks/useUser";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import useResume from "../../hooks/useResume";
import MainSpinner from "../MainSpinner";
import { motion } from "framer-motion";
import Modal from "../ui/Modal";
import NavigationConfirmation from "../ui/NavigationConfirmation";

const BasicDetails = () => {
  //states
  const [preloadData, setPreloadData] = useState(null);

  //refs
  const formRef = useRef();

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    defaultValues: { ...preloadData },
  });

  //other hooks
  const { templateId, resumeId, name } = useParams();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: resumes, isLoading } = useResume();

  //debugging console statements

  ///////SideEffects//////////
  useEffect(() => {
    reset(preloadData);
  }, [preloadData]);

  useEffect(() => {
    if (!isLoading && resumes) {
      const currentResume = resumes.find((resume) => resume.id === resumeId);
      if (currentResume) {
        setPreloadData(currentResume.resumeData.basicDetails);
      }
    }
  }, [resumes, isLoading]);

  // HANDLER functions

  //submit handler
  async function submitHandler(data) {
    const docRef = doc(db, `users/${user.uid}/resumeCollection/${resumeId}`);
    const docData = await getDoc(docRef);

    const basicDetailsData = {
      ...data,
    };
    if (docData.exists()) {
      await updateDoc(docRef, { basicDetails: basicDetailsData });
    } else {
      await setDoc(docRef, {
        templateId,
        name,
        basicDetails: basicDetailsData,
      });
    }
    toast.success("Saved successfully", {
      containerId: "saved",
      autoClose: 2000,
    });

    navigate(`/templates/${templateId}/${resumeId}/${name}/build/education`);
  }

  //loading handler

  if (isLoading) {
    return <MainSpinner />;
  }

  //JSX
  return (
    <section>
      <form ref={formRef} onSubmit={handleSubmit(submitHandler)}>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 p-8 gap-4 mb-8"
        >
          <div className="col-span-12 heading text-2xl font-semibold text-violet-500 sticky top-0 left-0 bg-white mb-5">
            {" "}
            Basic details
          </div>
          <Input
            label="First name "
            placeholder="William"
            isRequired="true"
            type="text"
            col="col-span-12 md:col-span-6"
            error={errors.firstName}
            {...register("firstName", { required: "First name is required" })}
          />
          <Input
            label="Last name "
            placeholder="Lee"
            isRequired="true"
            type="text"
            col="col-span-12 md:col-span-6"
            error={errors.lastName}
            {...register("lastName", { required: "Last name is required" })}
          />
          <Input
            label="Course"
            placeholder="B-tech"
            type="text"
            isRequired="true"
            col="col-span-12 md:col-span-4"
            errors={errors.course}
            {...register("course", { required: "Course is required" })}
          />
          <Input
            label="Branch"
            placeholder="Computer science and engineering"
            type="text"
            isRequired="true"
            col="col-span-6 md:col-span-4"
            error={errors.branch}
            {...register("branch", { required: "Branch is required" })}
          />
          <Input
            label="Specialisation"
            placeholder="Artificial Intelligence"
            type="text"
            col="col-span-6 md:col-span-4"
            error={errors.specialisation}
            {...register("specialisation")}
          />
          {/* contact details  */}
          <h1 className="col-span-12 text-xl ">Contact Info :</h1>
          <Input
            label="Email"
            placeholder="xyz@gmail.com"
            isRequired="true"
            type="text"
            col="col-span-12 md:col-span-6"
            error={errors.email}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email",
              },
            })}
          />
          <Input
            label="Linkedin"
            placeholder="Linkedin profile URL"
            type="text"
            isRequired="true"
            col="col-span-12 md:col-span-6"
            error={errors.linkedin}
            {...register("linkedin", {
              required: "linkedin profile is required",
              pattern: {
                value:
                  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
                message: "Please enter a valid URL",
              },
            })}
          />
          <Input
            label="Github"
            placeholder="Github profile url"
            type="text"
            col="col-span-12 md:col-span-6"
            error={errors.github}
            {...register("github", {
              pattern: {
                value:
                  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
                message: "Please enter a valid URL",
              },
            })}
          />
          <Input
            label="Website"
            placeholder="Portfolio URL"
            type="text"
            col="col-span-12 md:col-span-6"
            error={errors.website}
            {...register("website", {
              pattern: {
                value:
                  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
                message: "Please enter a valid URL",
              },
            })}
          />
          <Input
            label="Phone"
            placeholder="Contact number"
            type="text"
            isRequired="true"
            col="col-span-6 md:col-span-4"
            error={errors.phone}
            {...register("phone", {
              required: "Phone number is required",
              validate: (value) => {
                if (value.length != 10) return "Enter a valid phone number";
              },
            })}
          />
          <Button
            disabled={isSubmitting}
            name={isSubmitting ? "Saving..." : "Save and next"}
            classname={`bg-violet-500 disabled:bg-gray-500 text-white row-start-12 col-start-3 md:col-start-10 col-span-8 md:col-span-2`}
          />
        </motion.div>
      </form>
      {/* {blocker.state === 'blocked' && (
        <Modal isOpen={blocker.state === 'blocked' && Object.keys(errors).length === 0} onClose={()=>blocker.reset()}>
          <NavigationConfirmation isSubmitting={isSubmitting} onConfirm ={()=>formRef.current.requestSubmit()} onClose={()=>blocker.proceed()} />
        </Modal>
      )} */}
    </section>
  );
};

export default BasicDetails;
