import os
import pickle
from classifier import predict_post
from sklearn.metrics import precision_score, recall_score, f1_score, classification_report, confusion_matrix


def test_model(test_x, test_y):
    pred_y = []

    for post in test_x:
        y_hat = predict_post(post)

        if y_hat > 0.5:
            pred_y.append(1.0)
        else:
            pred_y.append(0)

    p_score = precision_score(test_y, pred_y, average='micro')
    r_score = recall_score(test_y, pred_y, average='micro')
    f1 = f1_score(test_y, pred_y, average='micro')
    c_report = classification_report(test_y, pred_y)
    c_matrix = confusion_matrix(test_y, pred_y)

    report = {
        'precision_score': p_score,
        'recall_score': r_score,
        'f1_score': f1,
        'classification_report': c_report,
        'confusion_matrix': c_matrix
    }
    with open(os.path.realpath(os.path.dirname(__file__)) + '/data/accuracy_report.pkl', 'wb') as f:
        pickle.dump(report, f)

    print('\nModel Results:')
    print('Precision Score:', p_score)
    print('Recall Score:', r_score)
    print('F1 Score:', f1)
    print('Classification Report:\n')
    print(c_report)
    print('Confusion Matrix:\n')
    print(c_matrix)
