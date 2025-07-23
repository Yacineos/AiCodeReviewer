import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService } from '../../shared/services/AiService';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chat {
  readonly aiService = inject(AiService);
  readonly codeInput = new FormControl('');
  
  readonly aiAnswer = this.aiService.aiAnswer;

  public reviewCode() {
    const code = this.codeInput.value || '';
    this.aiService.reviewCode(code);
    this.codeInput.setValue('');
  }
}
