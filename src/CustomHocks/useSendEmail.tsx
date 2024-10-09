
import { AxiosResponse } from 'axios';
import useAxiosPublic from './useAxiosPublic';

export interface MailDataType {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
}


export interface ResType {
  success: boolean;
  message: string;
}


const useSendEmail = () => {
 const AxiosPublic = useAxiosPublic()
  const sendEmail = async (mailData: MailDataType): Promise<AxiosResponse<ResType>> => {
    const mailRes = await AxiosPublic.post<ResType>('/sendEmail', mailData );
   
    return mailRes.data;
  };

  return { sendEmail };
};

export default useSendEmail;
