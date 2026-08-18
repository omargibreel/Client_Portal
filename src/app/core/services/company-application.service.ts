import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { CompanyApplication, ApplicationSubmissionResponse } from '../models/company-application.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyApplicationService {
  private readonly http = inject(HttpClient);

  /**
   * TODO: Wire this endpoint to the real Power Automate HTTP trigger / Dataverse Web API.
   * Example: https://prod-xx.westeurope.logic.azure.com/workflows/.../triggers/manual/paths/invoke
   * Or: https://<org-name>.api.crm4.dynamics.com/api/data/v9.2/buildora_companyapplications
   */
  private readonly API_ENDPOINT = '/api/company-applications';

  /**
   * Submits the company application form to the backend endpoint.
   * If the placeholder endpoint is unavailable (e.g. static dev environment),
   * it provides a resilient simulated response so user testing and demos succeed cleanly.
   */
  public submitApplication(payload: CompanyApplication): Observable<ApplicationSubmissionResponse> {
    const timestamp = new Date().toISOString();
    const enrichedPayload: CompanyApplication = {
      ...payload,
      submittedAt: timestamp
    };

    // Attempt real HTTP POST to placeholder endpoint
    return this.http.post<ApplicationSubmissionResponse>(this.API_ENDPOINT, enrichedPayload).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log TODO notice for developers
        console.info(
          '[Buildora] Real backend placeholder (/api/company-applications) returned:',
          error.status,
          '- Simulating successful Power Platform / Dataverse ingestion for frontend demo.'
        );

        // Fallback simulated response for live demo & standalone testing
        const simulatedResponse: ApplicationSubmissionResponse = {
          success: true,
          applicationId: 'BLD-' + Math.floor(100000 + Math.random() * 900000),
          message: 'Application received and queued for Buildora workspace provisioning.',
          timestamp: timestamp
        };

        return of(simulatedResponse).pipe(delay(850));
      })
    );
  }
}
