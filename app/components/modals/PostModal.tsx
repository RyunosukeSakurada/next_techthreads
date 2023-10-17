'use client';

import axios from 'axios';
import React, { useMemo, useState } from 'react'
import ModalForPost from './ModalForPost'
import usePostModal from '@/app/hooks/usePostModal'
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import ImageUpload from '../inputs/ImageUpload';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../inputs/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 



enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
}


const PostModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const postModal = usePostModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      imageSrc: '',
      title: '',
      description: '',
    }
  });

  const category = watch('category');
  const imageSrc = watch('imageSrc');

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    switch (step) {
      case STEPS.CATEGORY:
        if (!category) {
          toast.error("Please select a category.");
          return;
        }
        break;
      case STEPS.IMAGES:
        if (!imageSrc) {
          toast.error("Please upload an image.");
          return;
        }
        break;
    }
    setStep((value) => value + 1);
  };
  

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return 'Publish'
    }

    return 'Next'
  }, [step]);


  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const handleQuillChange = (content: string) => {
    setCustomValue('description', content);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }
    
    setIsLoading(true);

    axios.post('/api/posts', data)
    .then(() => {
      toast.success('Post created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      postModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What is the category of your post?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a thumbnail of your post"
          subtitle="It will be displayed on the detail page"
        />
        <ImageUpload
          id="imageSrc"
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
          register={register}
          errors={errors}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
        <div className="flex flex-col gap-2 h-full">
            <Heading
                title="How would you describe your post?"
                subtitle="Please enter the title and the article."
            />
          <div className="flex flex-col gap-8">
              <Input
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
          </div>
            <hr />
            <ReactQuill
                className='h-full'
                value={watch("description")}
                onChange={handleQuillChange}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link'],
                        [{ 'header': '1'}, { 'header': '2'}],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                    ]
                }}
                theme="snow"
            />
            {errors.description && typeof errors.description.message === 'string' ? (
              <p className="text-rose-500 mt-2">{errors.description.message}</p>
            ) : null}
        </div>
    )
}



  return (
    <ModalForPost
      isOpen = {postModal.isOpen}
      onClose = {postModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} 
      title = "Write Post"
      body={bodyContent}
    />
  )
}

export default PostModal
