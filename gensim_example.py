import gensim
from nltk.corpus import brown
import nltk
nltk.download('brown') #this takes a while
model = gensim.models.Word2Vec(brown.sents()) #this takes a while
model.save('brown.embedding') 
gsim = gensim.models.Word2Vec.load('brown.embedding')

def gensim_cosine_similarity(sentence1, sentence2):
    vec_list1 = np.apply_along_axis(gsim.wv.__getitem__, 0, sentence1)
    vec_list2 = np.apply_along_axis(gsim.wv.__getitem__, 0, sentence2)
    vec1 = np.mean(vec_list1, axis=0)
    vec2 = np.mean(vec_list2, axis=0)
    costheta = np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
    similarity = 1.0 - math.acos(costheta) / math.pi
    return similarity

print(gensim_similarity(np.array(["apple", "car"]), np.array(["apple", "car"])))
print(gensim_similarity(np.array(["apple", "car"]), np.array(["apple"])))
print(gensim_similarity(np.array(["car"]), np.array(["apple"])))
print(gensim_similarity(np.array(["coffee"]), np.array(["phone"])))
print(gensim_similarity(np.array(["coffee"]), np.array(["milk"])))
# it sucks lol