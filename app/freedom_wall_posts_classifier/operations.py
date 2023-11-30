import sys
import numpy as np


def sigmoid(z):
    '''Return the sigmoid activation of logit
    Parameter:
        - z: a logit, calculated by multiplying vector theta and vector x
    '''
    h = 1 / (1 + np.exp(-z))
    return h


def gradient_descent(x, y, theta, alpha, iter_count):
    '''Perform gradient descent over n number of iterations.
    Parameters:
        - x: list of features
        - y: list of labels
        - theta: weight parameters
        - alpha: learning rate
        - iter_count: number of iterations
    '''
    m = np.shape(x)[0]

    for i in range(0, iter_count):
        sys.stdout.write(f'\rFinding optimal parameters [{i+1}/{iter_count}]...')
        z = np.dot(x, theta)
        h = sigmoid(z)

        # calculate the cost function
        J = (-1.0 * (np.dot(y.T, np.log(h)) + np.dot((1 - y).T, np.log(1 - h)))) / m
        # print(f'#{i} Cost: {float(J)}')

        # update the weights theta
        theta = theta - alpha / m * np.dot(x.T, h - y)

    J = float(np.squeeze(J))
    return J, theta
