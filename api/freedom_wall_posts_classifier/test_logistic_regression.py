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

    print('\nModel Results:')
    print('Precision Score:', precision_score(test_y, pred_y, average='micro'))
    print('Recall Score:', recall_score(test_y, pred_y, average='micro'))
    print('F1 Score:', f1_score(test_y, pred_y, average='micro'))
    print('Classification Report:\n')
    print(classification_report(test_y, pred_y))
    print('Confusion Matrix:\n')
    print(confusion_matrix(test_y, pred_y))
