import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CompanyApplication, ApplicationSubmissionResponse } from '../models/company-application.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyApplicationService {
  private readonly http = inject(HttpClient);

  /**
   * Connects to the Azure-hosted Buildora Web API backend endpoint.
   */
  private readonly API_ENDPOINT = environment.companyApplicationsEndpoint;

  /**
   * Submits the company application form to the backend endpoint.
   * Real errors (validation failures, the API being unreachable, etc.) are surfaced
   * to the caller as-is so the UI can show an honest success/error state instead of
   * masking a broken connection behind a simulated response.
   *
   * The tax image (if the applicant attached one) is optional, so it is uploaded as a
   * separate follow-up multipart request once the application itself has been created —
   * the main JSON submission never fails just because the file upload step has trouble.
   */
  public submitApplication(payload: CompanyApplication, taxImageFile?: File | null): Observable<ApplicationSubmissionResponse> {
    const timestamp = new Date().toISOString();
    const enrichedPayload: CompanyApplication = {
      ...payload,
      submittedAt: timestamp
    };

    return this.http.post<ApplicationSubmissionResponse>(this.API_ENDPOINT, enrichedPayload).pipe(
      switchMap((res) => {
        if (taxImageFile && res.applicationId) {
          return this.uploadTaxImage(res.applicationId, taxImageFile).pipe(
            map(() => res),
            catchError((error) => {
              console.error(
                '[Buildora] Tax image upload failed; application was still created:',
                error
              );
              return of(res);
            })
          );
        }
        return of(res);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(
          '[Buildora] POST /api/company-applications failed:',
          error.status,
          error.error ?? error.message
        );
        return throwError(() => error);
      })
    );
  }

  /**
   * Attaches the applicant's tax registration document/image to an already-submitted
   * application. Not called at all when no file was selected, since the tax image is optional.
   */
  private uploadTaxImage(applicationId: string, file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('taxImage', file, file.name);
    return this.http.post(`${this.API_ENDPOINT}/${applicationId}/tax-image`, formData);
  }
}
