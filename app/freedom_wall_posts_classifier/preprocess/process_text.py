import re
import string
from nltk.stem import PorterStemmer
from nltk.tokenize import TweetTokenizer
from nltk.corpus import stopwords
import enchant
from .TagalogStemmerPython.TglStemmer import stem_word as stem_filipino
from .tl_stopwords import TL_STOP_WORDS as tl_stopwords


def process_text(text):
    '''Preprocess a text and return a token of stem of words that is relevant for feature extraction
    Parameters:
        - text: a string to preprocess
    '''
    en_dict = enchant.Dict("en_US")
    eng_stopwords = stopwords.words('english')
    stemmer = PorterStemmer()
    tokenizer = TweetTokenizer(
        preserve_case=False, reduce_len=True, strip_handles=True)

    text = re.sub(r'\b([0-9]*)\b', '', text)  # Remove numbers

    text_stems = set()

    text_tokens = tokenizer.tokenize(text)
    for token in text_tokens:
        if token not in string.punctuation and token not in eng_stopwords and token not in tl_stopwords:
            text_stems.add(stemmer.stem(token))
            if not en_dict.check(token):
                text_stems.add(stem_filipino(token))

    return list(text_stems)
