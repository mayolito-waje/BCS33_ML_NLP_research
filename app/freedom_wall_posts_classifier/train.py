import sys
import numpy as np
import pandas as pd
import nltk
import pickle
import os
from preprocess.build_frequencies import build_frequencies
from preprocess.extract_features import extract_features
from freedom_wall_posts_classifier.operations import gradient_descent
from freedom_wall_posts_classifier.test_logistic_regression import test_model


def train():
    nltk.download('stopwords')  # download stopwords if it does not exist

    fd = os.path.realpath(os.path.dirname(__file__))

    # Extracting DataFrame
    df = pd.read_csv(fd + '/../../dataset/csv/posts.csv')
    related = df[df['label'] == 1]['post_text'].values
    non_related = df[df['label'] == 0]['post_text'].values

    print('Related DLSU-D posts length:', len(related))
    print('Non DLSU-D related posts length:', len(non_related))

    # Separate training and test data
    related_training_count = int(len(related) * 0.8)
    non_related_training_count = int(len(non_related) * 0.8)

    related_train = related[:related_training_count]
    related_test = related[related_training_count:]
    non_related_train = non_related[:non_related_training_count]
    non_related_test = non_related[non_related_training_count:]

    train_x = np.append(related_train, non_related_train, axis=0)
    test_x = np.append(related_test, non_related_test, axis=0)
    train_y = np.append(np.ones((len(related_train), 1)),
                        np.zeros((len(non_related_train), 1)), axis=0)
    test_y = np.append(np.ones((len(related_test), 1)),
                       np.zeros((len(non_related_test), 1)), axis=0)

    print('\nTraining data length:', len(train_x))
    print('Test data length:', len(test_x))

    # Post examples
    print('\nDLSU-D related posts examples:')
    for i in range(3):
        print(f'\t{i + 1}. {related[i][:100]}...')

    print('\nNon DLSU-D related posts examples:')
    for j in range(3):
        print(f'\t{j + 1}. {non_related[j][:100]}...')

    # Building frequency dictionary
    freqs = build_frequencies(train_x, train_y)
    print('\nExtracted frequency dictionary. Total length of frequency dictionary:', len(freqs))

    with open(fd + '/data/frequencies.pkl', 'wb') as f:
        pickle.dump(freqs, f)  # serialize the frequency dictionary

    # Feature extraction
    X = np.zeros((len(train_x), 3))
    for i in range(len(train_x)):
        sys.stdout.write(f'\rExtracting feature [{i + 1}/{len(train_x)}]...')
        X[i, :] = extract_features(train_x[i], freqs)

    Y = train_y
    print(f'\nExtracted features (total features: {len(X)})')

    # Gradient descent
    J, theta = gradient_descent(X, Y, np.zeros((3, 1)), 1e-5, 500000)
    print(f'\nPost-training cost: {J}')
    print(
        f'Post-training parameters or weights: {[round(t, 8) for t in np.squeeze(theta)]}')

    with open(fd + '/data/params.pkl', 'wb') as f:
        pickle.dump(theta, f)  # Serialize the parameters

    test_model(test_x, test_y)


train()
