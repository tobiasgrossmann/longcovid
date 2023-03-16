import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoadingService} from "../../services/loading-service.service";
import {finalize, map} from "rxjs/operators";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(
        private loadingService: LoadingService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.setLoading(true, request.url);
        return next.handle(request)
            .pipe(
                map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                    if (evt instanceof HttpResponse) {
                        this.loadingService.setLoading(false, request.url);
                    }
                    return evt;
                }),
                finalize(() => {
                    this.loadingService.setLoading(false, request.url);
                }));
    }
}
