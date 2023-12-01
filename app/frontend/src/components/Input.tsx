import { useState } from 'react';
import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';

function Input({ fetchResult }: InferProps<typeof Input.propTypes>) {
  const [post, setPost] = useState('');
  const [extended, setExtended] = useState(false);

  return (
    <div>
      <label className="post">
        Post:
        <br />
        <textarea
          rows={10}
          name="post"
          onChange={({ target }) => {
            setPost(target.value);
          }}
          placeholder="Write anything you feel like writing. The text can be in Tagalog, English, or Taglish."
        ></textarea>
      </label>
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          name="extended"
          onChange={() => {
            setExtended(!extended);
          }}
        />
        Extended details
      </label>
      <br />
      <br />
      <button
        onClick={() => {
          fetchResult({ post, extended });
        }}
      >
        See Results
      </button>
    </div>
  );
}

Input.propTypes = {
  fetchResult: PropTypes.func.isRequired,
};

export default Input;
