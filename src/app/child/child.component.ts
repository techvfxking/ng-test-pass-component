import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-child',
  template: `
    <div class="modal">
      <div class="modal-content">
        <h2>{{ modalTitle }}</h2>
        <div [innerHTML]="renderHtml(modalBody)"></div>
        <button (click)="closeModal()">Close</button>
      </div>
    </div>
  `,
})
export class ChildComponent {
  @Input()
  modalTitle!: string
  @Input()
  modalBody!: string
  @Output() closeModalEvent = new EventEmitter<void>()
  sanitizedModalBody!: SafeHtml

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {}

  ngOnChanges() {
    // Sanitize and trust the HTML content before rendering
    this.sanitizedModalBody = this.sanitizer.bypassSecurityTrustHtml(
      this.modalBody
    )
  }

  closeModal() {
    this.closeModalEvent.emit()
  }

  // Create a method to render the HTML safely
  renderHtml(content: string): void {
    const container = this.renderer.createElement('div')
    this.renderer.appendChild(
      container,
      this.sanitizer.bypassSecurityTrustHtml(content) as any
    )
    return container.innerHTML
  }
}
