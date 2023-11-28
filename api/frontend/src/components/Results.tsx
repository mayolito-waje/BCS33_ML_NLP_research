import { Result } from '../types/types';

interface ReportProps {
  result: Result;
}

function Report(props: ReportProps) {
  const result = props.result;

  return (
    <div>
      <div>Post: {result.post}</div>
      <div>Score: {result.score.toFixed(2)}</div>
      <div>Predicted Label: {result.predicted_label}</div>
      {result.feature ? (
        <div>
          Features:{' [ '}
          {result.feature.map((e) => (
            <span>{e}, </span>
          ))}
          {' ]'}
        </div>
      ) : null}
      {result.model_classification_report ? (
        <div>
          <div>Post Model Training Classification Report</div>
          <div>
            Parameters:{' [ '}
            {result.model_classification_report?.parameters.map((e) => (
              <span>{e.toFixed(4)}, </span>
            ))}
            {' ]'}
          </div>
          <div>
            Accuracy Score:{' '}
            {result.model_classification_report?.accuracy_score.toFixed(2)}
          </div>
          <div>
            Precision Score:{' '}
            {result.model_classification_report?.precision_score.toFixed(2)}
          </div>
          <div>
            Recall Score:{' '}
            {result.model_classification_report?.recall_score.toFixed(2)}
          </div>
          <div>
            F1 Score: {result.model_classification_report?.f1_score.toFixed(2)}
          </div>
          <div>
            Confusion Matrix:{' '}
            <table className="tg">
              <tbody>
                <tr>
                  <td className="tg-0lax">
                    {result.model_classification_report.confusion_matrix[0][0]}
                  </td>
                  <td className="tg-0lax">
                    {result.model_classification_report.confusion_matrix[0][1]}
                  </td>
                </tr>
                <tr>
                  <td className="tg-0lax">
                    {result.model_classification_report.confusion_matrix[1][0]}
                  </td>
                  <td className="tg-0lax">
                    {result.model_classification_report.confusion_matrix[1][1]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Report;
