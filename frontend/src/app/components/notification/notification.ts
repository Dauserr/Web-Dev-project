import {Component, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {appTranslator} from '../../../../public/i18n/translocoExports';

interface notificationMessagesCodesInterface{
  successTitle?:string
  successDescription?:string
  errorTitle?:string
  errorDescription?:string
  warningTitle?:string
  warningDescription?:string
  infoTitle?:string
  infoDescription?:string
}

@Component({
  selector: 'app-notification',
  imports: [],
  standalone:true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})

@Injectable({providedIn:'root'})
export class NotificationService  {
  t = appTranslator()
  constructor(private toastr: ToastrService) {
  }

  success(notificationMessagesCode:notificationMessagesCodesInterface){
    const successTitle = notificationMessagesCode.successTitle || 'title_success'
    const successDescription = notificationMessagesCode.successDescription || 'success_action_desc'
    return this.toastr.success(this.t(successDescription),this.t(successTitle), {
      positionClass: 'toast-top-right'
    })
  }

  errorNotif(notificationMessagesCode:notificationMessagesCodesInterface){
    const errorTitle = notificationMessagesCode.errorTitle || 'title_error'
    const errorDescription = notificationMessagesCode.errorDescription || 'title_error_desc'
    return this.toastr.error(this.t(errorDescription),this.t(errorTitle), {
      positionClass: 'toast-top-right'
    })
  }

  warning(notificationMessagesCode:notificationMessagesCodesInterface) {
    const warningTitle = notificationMessagesCode.warningTitle || 'title_warning'
    const warningDescription = notificationMessagesCode.warningDescription || 'warning_desc'
    return this.toastr.warning(this.t(warningDescription), this.t(warningTitle), {
      positionClass: 'toast-top-right'
    });
  }

  infoNotif(notificationMessagesCode:notificationMessagesCodesInterface) {
    const infoTitle = notificationMessagesCode.infoTitle || 'title_info'
    const infoDescription = notificationMessagesCode.infoDescription ||  'info_desc'
    return this.toastr.info(this.t(infoDescription), this.t(infoTitle), {
      positionClass: 'toast-top-right'
    });
  }
}
