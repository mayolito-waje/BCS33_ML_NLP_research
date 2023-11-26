import os
import numpy as np
import pickle
from freedom_wall_posts_classifier.preprocess.extract_features import extract_features
from freedom_wall_posts_classifier.operations import sigmoid


def predict_post(post_text):
    '''Predict a post and return their classification score.
    Parameters:
        - post: a string, particularly a post
    '''
    fd = os.path.realpath(os.path.dirname(__file__))

    with open(fd + '/data/frequencies.pkl', 'rb') as f:
        freqs = pickle.load(f)
    with open(fd + '/data/params.pkl', 'rb') as f:
        theta = pickle.load(f)

    x = extract_features(post_text, freqs)
    z = np.dot(x, theta)
    y_pred = sigmoid(z)

    return y_pred
