import numpy as np
from preprocess.process_text import process_text


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
    for label, text in zip(labels, textslist):
        for word in process_text(text):
            key = (word, label)
            freqs[key] = freqs.get(key, 0) + 1

    return freqs
