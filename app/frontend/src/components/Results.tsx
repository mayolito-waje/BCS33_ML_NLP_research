import { Result } from '../types/types';

interface ReportProps {
  result: Result;
}

function toPercent(num: number) {
  num = num * 100;
  return num.toFixed(2) + '%';
}

function Report(props: ReportProps) {
  const result = props.result;

  return (
    <div className="report">
      <h2>Report</h2>
      <div className="report_data">
        <div className="main_report">
          <div>
            <strong>Post:</strong>
          </div>
          <div>{result.post}</div>
          <br />
          <div>
            <strong>Score:</strong> {result.score.toFixed(2)}
          </div>
          <div>
            <strong>Predicted Label:</strong>{' '}
            {result.predicted_label === 1 ? 'relevant (1)' : 'non-relevant (0)'}
          </div>
          {result.feature ? (
            <div>
              <strong>Vectorized form of post text (feature):</strong>
              {' [ '}
              {result.feature.map((e) => (
                <span key={'feature-' + e}>{e}, </span>
              ))}
              {' ]'}
            </div>
          ) : null}
          {result.model_classification_report?.parameters ? (
            <div>
              <strong>Parameters used to classify feature:</strong>
              {' [ '}
              {result.model_classification_report?.parameters.map((e) => (
                <span key={'cr-param-' + e}>{e.toFixed(4)}, </span>
              ))}
              {' ]'}
            </div>
          ) : null}
        </div>
        {result.model_classification_report ? (
          <div className="classification_report">
            <h4>
              The model used to classify the post has the following accuracy:
            </h4>
            <div>
              <strong>Accuracy Score:</strong>{' '}
              {toPercent(result.model_classification_report?.accuracy_score)}
            </div>
            <div>
              <strong>Precision Score:</strong>{' '}
              {toPercent(result.model_classification_report?.precision_score)}
            </div>
            <div>
              <strong>Recall Score:</strong>{' '}
              {toPercent(result.model_classification_report?.recall_score)}
            </div>
            <div>
              <strong>F1 Score:</strong>{' '}
              {toPercent(result.model_classification_report?.f1_score)}
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
