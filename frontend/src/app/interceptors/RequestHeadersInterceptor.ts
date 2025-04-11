import {HttpInterceptorFn} from '@angular/common/http';


export const RequestHeadersInterceptor:HttpInterceptorFn  = (req,next) =>  {
    if(req.method === 'GET' && (req.url.includes('user-info/get-user-projects') || req.url.includes('user-info'))){
      const token = localStorage.getItem('accessToken');
      if(token){
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
        return next(clonedRequest)
      }
    }
  return next(req)
}
