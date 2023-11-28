export interface Result {
  post: string;
  score: number;
  predicted_label: number;
  feature?: number[];
  model_classification_report?: {
    parameters: number[];
    accuracy_score: number;
    precision_score: number;
    recall_score: number;
    f1_score: number;
    confusion_matrix: number[][];
  };
}

export interface Request {
  post: string;
  extended: boolean;
}
