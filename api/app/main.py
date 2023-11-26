import os
import numpy as np
import pickle
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
from freedom_wall_posts_classifier.classifier import predict_post


def set_label(score):
    score = np.squeeze(score)
    if (score > 0.5):
        return 1
    else:
        return 0


class Request(BaseModel):
    post: str
    extended: Optional[bool] = False


app = FastAPI()


@app.get('/model/')
async def test_model(request: Request):
    score = predict_post(request.post).tolist()[0][0]
    pred_label = set_label(score)

    report = dict()

    report['post'] = request.post
    report['score'] = score
    report['predicted_label'] = pred_label

    if (request.extended == True):
        fd = os.path.realpath(os.path.dirname(__file__))

        with open(fd + '/../freedom_wall_posts_classifier/data/accuracy_report.pkl', 'rb') as f:
            a_report = pickle.load(f)  # accuracy report
            extended = {
                'accuracy_score': a_report['accuracy_score'],
                'precision_score': a_report['precision_score'],
                'recall_score': a_report['recall_score'],
                'f1_score': a_report['f1_score'],
                'confusion_matrix': a_report['confusion_matrix'].tolist()
            }

            report['model_classification_report'] = extended

    return report


@app.get('/')
async def root():
    return {'message': 'Welcome to DLSU-D Freedom Wall Posts Classifier'}
