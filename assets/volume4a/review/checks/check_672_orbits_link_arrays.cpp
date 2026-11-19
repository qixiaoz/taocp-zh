#include <array>
#include <cstdint>
#include <cstdlib>
#include <iostream>
#include <map>
#include <vector>
using U=uint32_t;
// Independent representation: parse the printed balanced-parenthesis word into
// explicit first-child and next-sibling arrays. No bit-reversal or recursive
// substring transpose from the earlier executable is reused.
struct Tree{
 int n,len,first=-1;std::array<int,15> left,right,last;U output=0;
 Tree(int count,U word):n(count),len(2*count){left.fill(-1);right.fill(-1);last.fill(-1);std::array<int,15> parents{};int depth=0,created=0,previousRoot=-1;for(int p=len-1;p>=0;--p){if((word>>p)&1){int v=created++;if(depth){int par=parents[depth-1];if(last[par]<0)left[par]=v;else right[last[par]]=v;last[par]=v;}else{if(previousRoot<0)first=v;else right[previousRoot]=v;previousRoot=v;}parents[depth++]=v;}else if(--depth<0)std::exit(2);}if(created!=n||depth)std::exit(3);}
 void digit(bool x){output=(output<<1)|U(x);}
 void transposeNode(int v){if(v<0)return;digit(1);transposeNode(right[v]);digit(0);transposeNode(left[v]);}
 void mirrorForest(int v){std::array<int,15> roots{};int k=0;for(int j=v;j>=0;j=right[j])roots[k++]=j;while(k){int j=roots[--k];digit(1);mirrorForest(left[j]);digit(0);}}
 U transpose(){output=0;transposeNode(first);return output;}
 U mirror(){output=0;mirrorForest(first);return output;}
};
struct Counter{
 int n,len;std::vector<uint64_t> visited;uint64_t words=0,permutationCycles=0,fixedR=0,fixedT=0;std::map<uint64_t,uint64_t> histogram;
 explicit Counter(int count):n(count),len(2*count),visited(((uint64_t(1)<<len)+63)/64,0){}
 bool mark(U w){auto &v=visited[w>>6];uint64_t m=uint64_t(1)<<(w&63);if(v&m)return false;v|=m;return true;}
 U successor(U w){Tree original(n,w);U t=original.transpose(),r=original.mirror();fixedR+=r==w;fixedT+=t==w;Tree transposed(n,t);return transposed.mirror();}
 void cycle(U start){if(!mark(start))return;++permutationCycles;uint64_t size=1;U w=successor(start);while(mark(w)){++size;w=successor(w);}if(w!=start)std::exit(4);++histogram[size];}
 void generate(U w,int open,int close){if(close==n){++words;cycle(w);return;}if(open<n)generate((w<<1)|1,open+1,close);if(close<open)generate(w<<1,open,close+1);}
 void result(){uint64_t path=(fixedR+fixedT)/2;std::cout<<"{\"n\":"<<n<<",\"DyckWords\":"<<words<<",\"cyclesOfPermutationRT\":"<<permutationCycles<<",\"fixedMirror\":"<<fixedR<<",\"fixedTranspose\":"<<fixedT<<",\"pathComponents\":"<<path<<",\"groupComponentsFromInvolutionIdentity\":"<<(permutationCycles+path)/2<<",\"rotationCycleHistogram\":{";bool first=true;for(auto [s,c]:histogram){if(!first)std::cout<<",";first=false;std::cout<<"\""<<s<<"\":"<<c;}std::cout<<"}}\n";}
};
int main(int argc,char**argv){int n=argc>1?std::atoi(argv[1]):15;if(n<1||n>15)return 1;Counter c(n);c.generate(0,0,0);c.result();}
