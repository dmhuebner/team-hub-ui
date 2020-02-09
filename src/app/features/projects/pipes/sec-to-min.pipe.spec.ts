import { SecToMinPipe } from './sec-to-min.pipe';

describe('MillisecondsToMinPipe', () => {
  it('create an instance', () => {
    const pipe = new SecToMinPipe();
    expect(pipe).toBeTruthy();
  });
});
