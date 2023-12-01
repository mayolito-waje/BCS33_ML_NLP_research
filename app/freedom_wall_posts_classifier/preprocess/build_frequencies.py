import sys
import numpy as np
from .process_text import process_text


def build_frequencies(texts, ys):
    '''Return a dictionary with tuple of (word, label) as keys
    and values are how many times a word appeared on the dataset
    based on their corresponding label.

    Parameters:
        - xlist: a list of texts
        - ylist: a list of labels corresponding to texts
    '''
    textslist = np.squeeze(texts).tolist()
    labels = np.squeeze(ys).tolist()

    freqs = {}

    i = 1
    for label, text in zip(labels, textslist):
        sys.stdout.write(
            f'\rExtracting frequency dictionary [{i}/{len(labels)}]...')

        for word in process_text(text):
            key = (word, label)
            freqs[key] = freqs.get(key, 0) + 1

        i += 1

    return freqs
