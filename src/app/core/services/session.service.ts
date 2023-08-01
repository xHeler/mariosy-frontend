import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userUUID = "95f1b246-81ff-43a6-92c6-98a208abe331";

  setUserUUID(uuid: string): void {
    this.userUUID = uuid;
  }

  getUserUUID(): string | null {
    return this.userUUID;
  }
}
