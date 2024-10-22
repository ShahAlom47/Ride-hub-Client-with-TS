import { useForm, SubmitHandler } from "react-hook-form";
import useSendEmail, { ResType } from "../../CustomHocks/useSendEmail";
import Swal from "sweetalert2";
import { useState } from "react";
import ButtonLoading from "../ButtonLoading/ButtonLoading";


interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}



const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const { sendEmail } = useSendEmail();
  const [isLoading, setIsLoading] = useState(false)



  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true)
    //  mail data object
    const mailData = {
      from: 'ridehub47@gmail.com',
      to: data.email,
      subject: data.subject,
      html: `Hi, I'm ${data.name} . ${data.message}`,
    };


    const mailRes: ResType = await sendEmail(mailData);
    if (mailRes) {
      setIsLoading(false)
    }

    if (mailRes?.success) {
      reset();
      Swal.fire({
        toast: true,
        icon: 'success',
        title: mailRes?.message,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }


    Swal.fire({
      toast: true,
      icon: 'error',
      title: mailRes?.message || 'Something is Wrong ,Please Try again',
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  };



  return (
    <div className="p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col text-white">
        <input placeholder="Name" type="text" className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("name")} required />
        <input placeholder="Your Email" type="email" className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("email")} required />
        <input placeholder="Subject" type="text" className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("subject")} required />
        <textarea placeholder="Your Message" className="bg-gray-900 rounded-sm py-2 px-4 w-full outline-none" {...register("message")} required></textarea>
        <button type="submit" className="btn-p cursor-pointer w-full max-h-10 overflow-y-hidden flex justify-center items-center">{isLoading?<ButtonLoading/>:'Submit'}</button>
        
      </form>
    </div>
  );
};

export default ContactForm;


//  const mailData = {
//     from: 'your-email@gmail.com',
//     to: 'receiver-email@gmail.com',
//     subject: 'Test Email',
//     html: '<h1>This is a test email</h1>',
// };