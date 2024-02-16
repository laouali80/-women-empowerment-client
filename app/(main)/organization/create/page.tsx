"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { redirect, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import OrgNameForm from "../components/forms/OrgName.form";
import OrgCategoryForm from "../components/forms/OrgCategory.form";
import OrgLogoForm from "../components/forms/OrgLogo.form";
import OrgLinksForm from "../components/forms/OrgLinks.form";
import OrgAddressForm from "../components/forms/OrgAddress.form";
import OrgContactForm from "../components/forms/OrgContact.form";
import OrgDescriptionForm from "../components/forms/OrgDescription.form";
import OrgImagesForm from "../components/forms/OrgImages.form";
import OrgStepComplete from "../components/forms/OrgStepComplete";
import {
  OrganizationFormStore,
  useOrganizationFormStore,
} from "@/lib/store/createOrgForm.store";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "@/lib/context/app-context";

function CreateOrganizationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const { step, setStep, data, setData, resetStore } =
    useOrganizationFormStore();
    const {token} = useAppContext()

    

  const RenderForm = () => {
    const handleNext = () => {
      // console.table(data);
      // console.log("prev data", data);

      setStep(step + 1);
    };

    const handleGoBack = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    };

    const handleSkip = () => {
      setStep(step + 1);
    };


 const createOrganization = async () => {
  setIsLoading(true)
    try {
      const { data } = useOrganizationFormStore.getState();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = `${apiUrl}/organizations`;

      let formData = new FormData();
      formData.append("organizationDetails", new Blob([JSON.stringify(data.organizationDetails)], { type: "application/json" }))
      console.log(formData);

      // Append additional fields or files as needed
      if (data.logo) {
        formData.append('logo', data.logo);
      }

      if (data.image) {
        formData.append('image', data.image);
      }

      

      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setIsLoading(false)
        // Handle success
        toast.success('Organization created successfully');
        // Redirect or navigate to the next step
        handleNext()
      } else {
        setIsLoading(false)
        // Handle other response statuses or errors
        toast.error(`Error creating organization: ${response.data}`);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error creating organization:', error);
      toast.error('Error creating organization');
    }
  };



    const { handleSubmit } = useForm<OrganizationFormStore>();

    const onSubmitHandler: SubmitHandler<OrganizationFormStore> = () => {
      createOrganization();
    };

    switch (step) {
      case 1:
        return <OrgNameForm handleNext={handleNext} />;
      case 2:
        return (
          <OrgCategoryForm
            handleNext={handleNext}
            handleGoBack={handleGoBack}
          />
        );
      case 3:
        return (
          <OrgLogoForm
            handleNext={handleNext}
            handleSkip={handleSkip}
            handleGoBack={handleGoBack}
          />
        );
      case 4:
        return (
          <OrgLinksForm handleNext={handleNext} handleGoBack={handleGoBack} />
        );
      case 5:
        return (
          <OrgAddressForm handleNext={handleNext} handleGoBack={handleGoBack} />
        );
      case 6:
        return (
          <OrgContactForm handleNext={handleNext} handleGoBack={handleGoBack} />
        );
      case 7:
        return (
          <OrgDescriptionForm
            handleNext={handleNext}
            handleGoBack={handleGoBack}
          />
        );
      case 8:
        return (
          <OrgImagesForm
            handleNext={handleSubmit(onSubmitHandler)}
            handleSkip={handleSubmit(onSubmitHandler)}
            handleGoBack={handleGoBack}
          />
        );
      case 9:
        return <OrgStepComplete handleNext={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence initial={true} mode="wait">
      <RenderForm />
    </AnimatePresence>
  );
}

export default CreateOrganizationPage;
