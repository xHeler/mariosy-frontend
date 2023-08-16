import { KeycloakService } from "keycloak-angular";
import { SessionService } from './../core/services/session.service';

export function initializeKeycloak(
  keycloak: KeycloakService,
  sessionService: SessionService
): () => Promise<void> {
  return async () => {
    await keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'deloitte',
        clientId: 'mariosy-frontend',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/verify-sso.html',
      },
      
    });

    await sessionService.initializeService();
  };
}
