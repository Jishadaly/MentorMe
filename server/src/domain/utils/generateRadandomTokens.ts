const otpGenerator = require('otp-generator');

export const  generateRamdomId=()=>{
 return otpGenerator.generate(8, { upperCaseAlphabets: true, specialChars: true ,digits:true , lowerCaseAlphabets : true });
}

export const  AddMinutesToDate =(date :Date, minutes:number)=> {
  return new Date(date.getTime() + minutes*60000);
}

