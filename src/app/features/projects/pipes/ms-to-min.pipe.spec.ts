import { MsToMinPipe } from './ms-to-min.pipe';

describe('MillisecondsToMinPipe', () => {
  it('create an instance', () => {
    const pipe = new MsToMinPipe();
    expect(pipe).toBeTruthy();
  });
});
