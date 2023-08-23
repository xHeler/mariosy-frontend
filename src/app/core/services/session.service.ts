import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userUUID = "adf0f389-d526-45a8-8200-4734ba5fd72d";

  setUserUUID(uuid: string): void {
    this.userUUID = uuid;
  }

  getUserUUID(): string | null {
    return this.userUUID;
  }
}
