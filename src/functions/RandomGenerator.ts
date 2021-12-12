class RandomGenerator {
  private readonly UINT32_MAX_NEXT = 2 ** 32;
  private readonly s: Uint32Array;

  constructor(seed = Date.now()) {
    this.s = Uint32Array.of(seed);
  }

  next() {
    this.s[0] ^= this.s[0] << 13;
    this.s[0] ^= this.s[0] >> 17;
    this.s[0] ^= this.s[0] << 5;
    return this.s[0] / this.UINT32_MAX_NEXT;
  }

  nextInt(min: number, max: number) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}

export default RandomGenerator;
