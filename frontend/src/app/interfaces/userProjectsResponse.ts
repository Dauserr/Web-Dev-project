export interface UserProjectsResponse{
  response_code:string,
  data:projectsDataTypes[]
}

export interface projectsDataTypes{
  category:string,
  created_at:string,
  current_funds:string,
  deadline:string,
  description:string,
  id:number,
  target_funds:string,
  title:string,
  user_id:string,
}
