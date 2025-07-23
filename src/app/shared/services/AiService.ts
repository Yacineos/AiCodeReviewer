import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AiService {
    
    private readonly _aiAnswer = signal<string>('');
    public readonly aiAnswer = this._aiAnswer.asReadonly();

    public reviewCode(code: string) {
        if (code.trim() === '') {
            alert('Please enter some code to review.');
            return;
        }

        this._aiAnswer.set(`AI Review: The code "${code}" you provided is well-structured and follows best practices.`);
    }
}