import { useForm, SubmitHandler } from "react-hook-form";


interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
   
    reset();
  };


    return (
        <div className="p-2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col">
                <input placeholder="Name" type="text"className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("name")} required />
                <input placeholder="Your Email" type="email"  className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("email")} required />
                <input placeholder="Subject" type="text"  className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("subject")} required />
                <textarea placeholder="Your Message"  className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("message")} required></textarea>
                <button type="submit" className="btn-p cursor-pointer w-full">Submit</button>
            </form>
        </div>
    );
};

export default ContactForm;