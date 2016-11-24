curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST http://127.0.0.1:8080/api/v1/similarity-search/ \
 -d'{"search_word":"Java","bookmark" : [{	"id"  : "1","url" : "http://qiita.com/opengl-8080/items/05d9490d6f0544e2351a" },{"id"  : "2","url" : "https://ja.wikipedia.org/wiki/Java"},{"id"	: "3","url" : "http://www.oracle.com/jp/java/overview/index.html"}]}' 

