import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  closeWindow: () => void;
}

function Information({ closeWindow }: Props) {
  return (
    <div className="information">
      <FontAwesomeIcon
        className="close_information"
        onClick={closeWindow}
        icon={faXmark}
      />
      <br />
      <br />
      <div>
        <p>
          In this website, the AIClassifier shall classify the post if it’s:
        </p>
        <ul>
          <li>- relevant to DLSU-D in context [referred to as 1]</li>
          <li>- non-relevant to DLSU-D in context [referred to as 0]</li>
        </ul>
        <p>Relevant post examples includes:</p>
        <ul>
          <li>school criticism</li>
          <li>inquiries</li>
          <li>questions about university's system</li>
          <li>thoughts about school events</li>
          <li>and more...</li>
        </ul>
      </div>
    </div>
  );
}

export default Information;
