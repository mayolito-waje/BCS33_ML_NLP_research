import { useState } from 'react';
import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';

function Input({ fetchResult }: InferProps<typeof Input.propTypes>) {
  const [post, setPost] = useState('');
  const [extended, setExtended] = useState(false);

  return (
    <div>
      <label htmlFor="post">Post:</label>
      <textarea
        name="post"
        onChange={({ target }) => {
          setPost(target.value);
        }}
      ></textarea>
      <input
        type="checkbox"
        name="extended"
        onChange={() => {
          setExtended(!extended);
        }}
      />
      <label htmlFor="extended"></label>
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
