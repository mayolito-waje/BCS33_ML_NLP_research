import sys
import os
import pickle
from classifier import predict_post
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix


def test_model(test_x, test_y):
    pred_y = []

    for i in range(test_x):
        sys.stdout.write(f'Testing model [{i+1}/{len(test_x)}]...')

        post = test_x[i]
        y_hat = predict_post(post)

        if y_hat > 0.5:
            pred_y.append(1.0)
        else:
            pred_y.append(0)

    a_score = accuracy_score(test_y, pred_y)
    p_score = precision_score(test_y, pred_y, average='micro')
    r_score = recall_score(test_y, pred_y, average='micro')
    f1 = f1_score(test_y, pred_y, average='micro')
    c_matrix = confusion_matrix(test_y, pred_y)

    report = {
        'accuracy_score': a_score,
        'precision_score': p_score,
        'recall_score': r_score,
        'f1_score': f1,
        'confusion_matrix': c_matrix
    }
    with open(os.path.realpath(os.path.dirname(__file__)) + '/data/accuracy_report.pkl', 'wb') as f:
        pickle.dump(report, f)

    print('\nModel Results:')
    print('Accuracy Score:', a_score)
    print('Precision Score:', p_score)
    print('Recall Score:', r_score)
    print('F1 Score:', f1)
    print('Confusion Matrix:\n')
    print(c_matrix)
