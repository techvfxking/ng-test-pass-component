import {
  Component,
} from '@angular/core'

@Component({
  selector: 'app-parent',
  template: `
    <app-child
      *ngIf="showModal"
      [modalTitle]="modalTitle"
      [modalBody]="modalBody"
      (closeModalEvent)="showModal = false"
    ></app-child>
  `,
})
export class ParentComponent {
  showModal = true
  modalTitle = 'Example Modal'
  modalBody =
    '<p>This is the modal body content with <strong>HTML</strong>.</p>'
}
