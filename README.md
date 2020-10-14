# Project 13: Semantic Similarity 3

This project will demonstrate various methodologies for computing sentence-to-sentence similarity scores.

⦁	Consider the datasets of word pairs whose similarity is manually annotated, especially MC-28, Word-Sim, RG, available at https://github.com/alexanderpanchenko/sim-eval. Similarly to the work on this repository, we would like to test the usefulness of any new similarity measure by computing its correlation with human judgment (using Pearson coefficient). Review how Pearson Coefficient works and identify python script to achieve this. Study Datamuse API, which outputs a set of words that are available to a query word. This API is available at http://www.datamuse.com/api/. 

⦁	We would like to test the similarity between the pair (X,Y) by using the output of the Datamuse API for both X and Y. Set the number of outcome words in the API to be large, e.g., 30. Use Jaccard similarity to compute the similarity between X and Y (Counting the ratio of common words among the outputs of X and Y Datamuse API over the total number of distinct words in the two outputs).

⦁	Repeat this process of calculating the similarity between each pair in MC-28 dataset, and then calculate the correlation coefficient with the human judgment using Pearson coefficient. Try to optimize the parameters of Datamuse API call by testing distinct number of outputs and monitor the value of the correlation until you reach the highest correlation value. Use this configuration to calculate the correlation value for other datasets, and compare the result with other state-of-art results as reported in relevant literature (e.g., previous sim-eval repository) .

⦁	We would like to test the above strategy at sentence level as well. For this purpose, given sentence S1 and S2, which are tokenized for instance as S1=(w1, w2,..,wn) and S2= (p1, p2, …, pm). Then, the representation of S1, will consist of the overlap of the Datamuse output of each individual token w1, w2,…wm (It is important to set the number of outputted words per API call high in order to increase the chance of overlapping), add to this list the tokens of S1 as well. Repeat the same process for S2 and then compute the similarity between S1 and S2 as jaccard similarity of the representation of S1 and representation of S2. Write a simple python code that allows you to achieve this.

⦁	We want to test this strategy on publicly available sentence database. For this purpose, use STSS-131 dataset, available in “A new benchmark dataset with production methodology for short text semantic similarity algorithms” by O’Shea, Bandar and Crockett (ACM Trans. on Speech and Language Processing, 10, 2013). Use Pearson correlation coefficient to test the correlation with the provided human judgment. 

⦁	Repeat the process of sentence similarity of STSS-131 but using word2vec embedding as in the labs assuming the vector representation of a sentence is the average of the word embedding vectors of all tokens in the sentence. Calculate the corresponding Pearson correlation as well. wor

⦁	Repeat 6) when using Glove and FastText embedding. Comment on the overall performance of Datamuse API based approach for text similarity. 

⦁	Study the programs in https://github.com/gsi-upm/sematch they attempt to provide other individual similarity but using other lexical database, not necessarily WordNet. Accommodate the provided files into your compare and repeat the calculus of Sim(S1,S2) for each pair of sentence where the individual similarity Sim(s,t) is calculated using YAGO concepts or DBPedia concepts freely available from the program. Compare the behavior of the result.

⦁	Suggest GUI of your own that facilitate the demonstration of your finding above
