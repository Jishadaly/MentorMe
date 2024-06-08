const otpGenerator = require('otp-generator');

export const  otpGeneratorFun=()=>{
 return otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,digits:true , lowerCaseAlphabets : false });
}

export const  AddMinutesToDate =(date :Date, minutes:number)=> {
  return new Date(date.getTime() + minutes*60000);
}

