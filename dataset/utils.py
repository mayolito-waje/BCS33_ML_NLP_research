import pandas as pd


def clean_csv(filename='csv/posts.csv'):
    """Clean CSV file and remove duplicates or empty rows
    parameter:
        filename: the location of the CSV file
    """
    posts = set()
    duplicates = []

    df = pd.read_csv(filename)

    df.dropna(inplace=True)

    for i, d, p, l in df.itertuples():
        if p in posts:
            print(f'Empty string or duplicate found: "{p}..."')
            duplicates.append(i)
        else:
            posts.add(p)

    df.drop(duplicates, inplace=True)
    df.to_csv(filename, index=False)
    print(f'{filename} duplicates and empty rows have been cleaned.')


def count_rows(filename='csv/posts.csv'):
    """Count total rows of CSV file and print the result
    parameter:
        filename: the location of the CSV file
    """
    df = pd.read_csv(filename)
    print(f'{filename} rows length:', len(df))
