import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockNzMessageService {
  error(message: string): void {
    console.error(message);
  }
}
