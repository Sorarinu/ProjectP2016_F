# coding:utf-8
from gensim.models import word2vec

# from resemblance.main.word2vec_sample.genModel import CreateModel
import sys

# def load_model(file_name):
#     model = create_model(file_name).read_file()
#     load = word2vec.Word2Vec.load(model)
#     results = load.most_similar(positive=model, topn=10)
#     for x in results:
#         print(x[0], '\t', x[1])


if __name__ == '__main__':
    # load_model('./panoramato_kidan.txt')

    model = word2vec.Word2Vec.load(sys.argv[1])
    results = model.most_similar(positive=sys.argv[2], topn=10)

    for result in results:
        print(result[0], '\t', result[1])
