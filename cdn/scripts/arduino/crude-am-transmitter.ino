#define CARRIER_OCR 1
#define SAMPLE_RATE 24000
#define MIC_GAIN 50 // 20

volatile int16_t audioSignal = 0;
volatile uint16_t micValue = 0;

// =========================
// SETUP
// =========================
void setup() {
  pinMode(3, OUTPUT);   // RF output (D3)
  pinMode(A0, OUTPUT);  // 100 Hz tone output

  // =========================
  // ADC SETUP (A2 MIC INPUT)
  // =========================
  ADMUX = _BV(REFS0) | 2;
  ADCSRA =
    _BV(ADEN) |
    _BV(ADPS2) | _BV(ADPS1) | _BV(ADPS0);

  // =========================
  // TIMER2 → RF CARRIER (UNCHANGED STYLE)
  // =========================
  TCCR2A = _BV(COM2B0) | _BV(WGM21);
  TCCR2B = _BV(CS20);
  OCR2A = CARRIER_OCR;

  // =========================
  // TIMER1 → AUDIO SAMPLING (8 kHz)
  // =========================
  TCCR1A = 0;
  TCCR1B = _BV(WGM12) | _BV(CS10);

  OCR1A = (16000000 / SAMPLE_RATE) - 1;

  TIMSK1 = _BV(OCIE1A);

  // =========================
  // TIMER0 → 100 Hz TONE ON A0
  // =========================
  TCCR0A = _BV(WGM01);
  TCCR0B = _BV(CS02); // prescaler 256

  OCR0A = 156; // ~100 Hz toggle rate

  TIMSK0 = _BV(OCIE0A);
}

// =========================
// A0 100 Hz TOGGLE ISR
// =========================
ISR(TIMER0_COMPA_vect) {
  PORTC ^= _BV(PC0);
}

// =========================
// ADC READ
// =========================
uint16_t readMic() {
  ADMUX = _BV(REFS0) | 2;
  ADCSRA |= _BV(ADSC);
  while (ADCSRA & _BV(ADSC));
  return ADC;
}

// =========================
// AUDIO ISR (RF MODULATION)
// =========================
ISR(TIMER1_COMPA_vect) {
  micValue = readMic();

  audioSignal = (int16_t)micValue - 512;

  // gain
  audioSignal *= MIC_GAIN;

  // clamp
  if (audioSignal > 200) audioSignal = 200;
  if (audioSignal < -200) audioSignal = -200;

  // YOUR ORIGINAL STYLE (OOK gating)
  if (audioSignal > 50) {
    TCCR2A |= _BV(COM2B0);
  } else {
    TCCR2A &= ~_BV(COM2B0);
    PORTD &= ~(1 << PD3);
  }
}

void loop() {
}
