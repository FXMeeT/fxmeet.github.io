import numpy as np
from scipy.io.wavfile import write

# Read your 17-bit samples from files
def read_samples(filename):
    with open(filename, "r") as f:
        return [int(line.strip()) for line in f if line.strip()]

samples_minus = read_samples("digital minus (17 bit).txt")
samples_plus  = read_samples("digital plus (17 bit).txt")

# Combine
samples_17bit = samples_minus + samples_plus

# Normalize to -1..1
samples_normalized = np.array(samples_17bit, dtype=np.float64)
samples_normalized = (samples_normalized / 131072.0) * 2 - 1

# Convert to 16-bit PCM
samples_pcm16 = np.int16(samples_normalized * 32767)

# Save as WAV (44.1 kHz)
write("output.wav", 44100, samples_pcm16)

print("WAV generated! Play it in any media player.")
