import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.messages.length).toEqual(0);
  });

  it('should add one message', () => {
    expect(service.messages.length).toEqual(0);
    service.add('hi there');
    expect(service.messages.length).toEqual(1);
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
});
