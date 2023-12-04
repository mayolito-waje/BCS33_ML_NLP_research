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

    # Remove numbers
    text = re.sub(r'\b([0-9]*)\b', '', text)
    # Remove links
    text = re.sub(
        r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)', '', text)

    text_stems = set()

    text_tokens = tokenizer.tokenize(text)
    for token in text_tokens:
        if token not in string.punctuation and token not in eng_stopwords and token not in tl_stopwords:
            en_stemmed = stemmer.stem(token)
            if en_stemmed:
                text_stems.add(en_stemmed)
            if not en_dict.check(token):
                tl_stemmed = stem_filipino(token)
                if tl_stemmed:
                    text_stems.add(tl_stemmed)

    return list(text_stems)
