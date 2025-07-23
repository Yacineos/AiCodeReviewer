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
  readonly isLoading = this.aiService.isLoading;

  readonly formattedAiAnswer = computed(() => {
    const answer = this.aiAnswer();
    if (!answer) return '';
    
    return this.formatMarkdownToHtml(answer);
  });

  public async reviewCode(): Promise<void> {
    const code = this.codeInput.value || '';
    await this.aiService.reviewCode(code);
    this.codeInput.setValue('');
  }

  private formatMarkdownToHtml(text: string): string {
    return text
      // Convert headers
      .replace(/^### (.*$)/gm, '<h4 class="review-section-title">$1</h4>')
      .replace(/^## (.*$)/gm, '<h3 class="review-main-title">$1</h3>')
      .replace(/^# (.*$)/gm, '<h2 class="review-primary-title">$1</h2>')
      
      // Convert bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="review-highlight">$1</strong>')
      
      // Convert code blocks
      .replace(/```([^`]+)```/g, '<div class="review-code-block"><pre><code>$1</code></pre></div>')
      
      // Convert inline code
      .replace(/`([^`]+)`/g, '<code class="review-inline-code">$1</code>')
      
      // Convert numbered lists
      .replace(/^\d+\.\s+(.*$)/gm, '<div class="review-list-item numbered">$1</div>')
      
      // Convert bullet points
      .replace(/^[-*]\s+(.*$)/gm, '<div class="review-list-item bullet">• $1</div>')
      
      // Convert line breaks to proper spacing
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      
      // Add icons for common sections
      .replace(/<h4 class="review-section-title">Code Quality/g, '<h4 class="review-section-title">✨ Code Quality')
      .replace(/<h4 class="review-section-title">Performance/g, '<h4 class="review-section-title">⚡ Performance')
      .replace(/<h4 class="review-section-title">Security/g, '<h4 class="review-section-title">🔒 Security')
      .replace(/<h4 class="review-section-title">Best Practices/g, '<h4 class="review-section-title">👍 Best Practices')
      .replace(/<h4 class="review-section-title">Improvements/g, '<h4 class="review-section-title">🚀 Improvements')
      .replace(/<h4 class="review-section-title">Issues/g, '<h4 class="review-section-title">⚠️ Issues')
      .replace(/<h4 class="review-section-title">Bugs/g, '<h4 class="review-section-title">🐛 Bugs');
  }
}
