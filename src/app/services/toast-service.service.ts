import {Injectable} from "@angular/core";
import {ToastController} from "@ionic/angular";

@Injectable({
    providedIn: "root"
})
export class ToastServiceService {

    private myToast: any = null;

    constructor(
        private toast: ToastController
    ) {
    }

    showSuccessToast(toastMessage: string) {
        this.hideToast();
        this.myToast = this.toast.create({
            message: toastMessage,
            cssClass: "toast-success",
            position: "bottom",
            duration: 2000,
            animated: true,
            color: "success",
            translucent: true
        }).then((toastData) => {
            console.log(toastData);
            toastData.present();
        });
    }

    showErrorToast(toastMessage: string) {
        this.hideToast();
        this.myToast = this.toast.create({
            cssClass: "toast-error",
            message: toastMessage,
            position: "bottom",
            duration: 2000,
            animated: true,
            color: "danger",
            translucent: true
        }).then((toastData) => {
            console.log(toastData);
            toastData.present();
        });
    }

    hideToast() {
        if (this.myToast !== null && this.myToast.length > 0) {
            this.myToast = this.toast.dismiss(null, undefined, null);
        }
    }

}
