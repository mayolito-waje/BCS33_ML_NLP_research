import numpy as np
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

    return report


@app.get('/')
async def root():
    return {'message': 'Welcome to DLSU-D Freedom Wall Posts Classifier'}
