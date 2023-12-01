import numpy as np
from .process_text import process_text


def extract_features(text, freqs):
    '''Extract features from preprocessed text.
    Parameters:
        - text: a string, particularly a mail
        - freqs: a dictionary with a using key (word, label) which contains 
        counts or how many times a word appeard based on label
    '''
    tokens = process_text(text)

    features = np.zeros(3)
    features[0] = 1

    for word in tokens:
        features[1] += freqs.get((word, 1.0), 0)
        features[2] += freqs.get((word, 0), 0)

    features = features[None, :]  # add batch dimension for further processing
    assert (features.shape == (1, 3))
    return features
