export interface ProfileInfoResponse {
  response_code:string,
  data:{
    user_name:string,
    user_fullName?:string,
    user_phoneNumber?:string,
    user_description?:string
  }
}

export interface ProfileInfo {
    user_name:string,
    user_fullName?:string,
    user_phoneNumber?:string,
    user_description?:string
}
