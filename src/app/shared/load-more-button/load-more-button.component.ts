import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreButtonComponent {

  @Output()
  onClick = new EventEmitter<void>;

  handleLoadMore() {
    this.onClick.emit();
  }
}
