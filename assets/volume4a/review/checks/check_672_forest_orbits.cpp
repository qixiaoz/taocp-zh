#include <algorithm>
#include <cstdint>
#include <cstdlib>
#include <iostream>
#include <map>
#include <string>
#include <vector>
using U=uint32_t;
struct Word{U bits;int len;};
struct Forests{
 int n,len;std::vector<uint64_t> visited;uint64_t enumerated=0,classes=0,covered=0,maxSize=0;bool maxIsCycle=false;U maxRepresentative=0;std::map<uint64_t,uint64_t> cycles,paths;std::vector<std::vector<U>> small;
 explicit Forests(int count):n(count),len(2*count),visited(((uint64_t(1)<<len)+63)/64,0){}
 bool mark(U w){auto &v=visited[w>>6];uint64_t mask=uint64_t(1)<<(w&63);if(v&mask)return false;v|=mask;return true;}
 U mirror(U x)const{x=((x&0x55555555u)<<1)|((x>>1)&0x55555555u);x=((x&0x33333333u)<<2)|((x>>2)&0x33333333u);x=((x&0x0f0f0f0fu)<<4)|((x>>4)&0x0f0f0f0fu);x=((x&0x00ff00ffu)<<8)|((x>>8)&0x00ff00ffu);x=(x<<16)|(x>>16);return (~x)>>(32-len);}
 Word parseTranspose(U w,int &p)const{if(p<0||!((w>>p)&1))return {0,0};--p;Word A=parseTranspose(w,p);if(p<0||((w>>p)&1)){std::cerr<<"unbalanced\n";std::exit(2);}--p;Word B=parseTranspose(w,p);int L=A.len+B.len+2;return {(U(1)<<(L-1))|(B.bits<<(A.len+1))|A.bits,L};}
 U transpose(U w)const{int p=len-1;Word r=parseTranspose(w,p);if(p!=-1||r.len!=len){std::cerr<<"parse-length\n";std::exit(3);}return r.bits;}
 std::string str(U w)const{std::string s;for(int p=len-1;p>=0;--p)s+=((w>>p)&1)?'(':')';return s;}
 void component(U first){if(!mark(first))return;std::vector<U> stack{first},few;uint64_t size=0;bool fixed=false;U minimum=first;while(!stack.empty()){U w=stack.back();stack.pop_back();++size;if(few.size()<4)few.push_back(w);minimum=std::min(minimum,w);U a=mirror(w),b=transpose(w);if(a==w||b==w)fixed=true;for(U v:{a,b})if(mark(v))stack.push_back(v);}++classes;covered+=size;if(fixed)++paths[size];else ++cycles[size];if(size>maxSize){maxSize=size;maxIsCycle=!fixed;maxRepresentative=minimum;}if(size<=3){std::sort(few.begin(),few.end());small.push_back(few);}}
 void generate(U w,int open,int close){if(close==n){++enumerated;component(w);return;}if(open<n)generate((w<<1)|1,open+1,close);if(close<open)generate(w<<1,open,close+1);}
 void printMap(const std::map<uint64_t,uint64_t>&m)const{std::cout<<"{";bool first=true;for(auto [size,count]:m){if(!first)std::cout<<",";first=false;std::cout<<"\""<<size<<"\":"<<count;}std::cout<<"}";}
 void output()const{std::cout<<"{\"n\":"<<n<<",\"allDyckWordsGenerated\":"<<enumerated<<",\"allForestsCovered\":"<<covered<<",\"classes\":"<<classes<<",\"largestSize\":"<<maxSize<<",\"largestIsCycle\":"<<(maxIsCycle?"true":"false")<<",\"largestRepresentative\":\""<<str(maxRepresentative)<<"\",\"cycleSizeHistogram\":";printMap(cycles);std::cout<<",\"pathSizeHistogram\":";printMap(paths);std::cout<<",\"classesOfSizeAtMostThree\":[";bool first=true;for(const auto&members:small){if(!first)std::cout<<",";first=false;std::cout<<"[";for(size_t i=0;i<members.size();++i){if(i)std::cout<<",";std::cout<<"\""<<str(members[i])<<"\"";}std::cout<<"]";}std::cout<<"]}\n";}
};
int main(int argc,char**argv){int n=argc>1?std::atoi(argv[1]):15;if(n<1||n>15)return 1;Forests f(n);f.generate(0,0,0);f.output();return f.covered==f.enumerated?0:4;}
