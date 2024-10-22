

import useAxiosPublic from './useAxiosPublic';

export interface MailDataType {
  from: string;
  to: string | undefined;
  subject: string;
  html?: string;
  text?: string;
}


export interface ResType {
  success: boolean;
  message: string;
}


const useSendEmail = () => {
  const AxiosPublic = useAxiosPublic();
  const sendEmail = async (mailData: MailDataType): Promise<{ message: string; success: boolean; }> => {
    const mailRes = await AxiosPublic.post<ResType>('/sendEmail', mailData);

    return {
      message: mailRes?.data?.message,
      success: mailRes?.data?.success
    };
  };

  return { sendEmail };
};

export default useSendEmail;
