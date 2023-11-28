import { Result } from '../types/types';

interface ReportProps {
  result: Result;
}

function Report(props: ReportProps) {
  const result = props.result;

  return (
    <div className="report">
      <h2>Report</h2>
      <div>
        <div>
          <strong>Post:</strong>
        </div>
        <div>{result.post}</div>
        <br />
        <div>
          <strong>Score:</strong> {result.score.toFixed(2)}
        </div>
        <div>
          <strong>Predicted Label:</strong> {result.predicted_label}
        </div>
        {result.feature ? (
          <div>
            <strong>Features:</strong>
            {' [ '}
            {result.feature.map((e) => (
              <span key={'feature-' + e}>{e}, </span>
            ))}
            {' ]'}
          </div>
        ) : null}
        {result.model_classification_report ? (
          <div>
            <h3>Post Model Training Classification Report:</h3>
            <div>
              <strong>Post Training Parameters Result:</strong>
              {' [ '}
              {result.model_classification_report?.parameters.map((e) => (
                <span key={'cr-param-' + e}>{e.toFixed(4)}, </span>
              ))}
              {' ]'}
            </div>
            <div>
              <strong>Accuracy Score:</strong>{' '}
              {result.model_classification_report?.accuracy_score.toFixed(2)}
            </div>
            <div>
              <strong>Precision Score:</strong>{' '}
              {result.model_classification_report?.precision_score.toFixed(2)}
            </div>
            <div>
              <strong>Recall Score:</strong>{' '}
              {result.model_classification_report?.recall_score.toFixed(2)}
            </div>
            <div>
              <strong>F1 Score:</strong>{' '}
              {result.model_classification_report?.f1_score.toFixed(2)}
            </div>
            <div>
              <strong>Confusion Matrix:</strong>{' '}
              <table className="table">
                <tbody>
                  <tr>
                    <td className="tg-0lax">
                      {
                        result.model_classification_report
                          .confusion_matrix[0][0]
                      }
                    </td>
                    <td className="tg-0lax">
                      {
                        result.model_classification_report
                          .confusion_matrix[0][1]
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="tg-0lax">
                      {
                        result.model_classification_report
                          .confusion_matrix[1][0]
                      }
                    </td>
                    <td className="tg-0lax">
                      {
                        result.model_classification_report
                          .confusion_matrix[1][1]
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Report;
