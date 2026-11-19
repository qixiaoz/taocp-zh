#include <stdio.h>
#include "gb_graph.h"
#include "gb_basic.h"
static void emit(const char *label,const long p[7]) {
  Graph *g=board(p[0],p[1],p[2],p[3],p[4],p[5],p[6]);
  Vertex *v;Arc *a;
  if(!g){fprintf(stderr,"board failed: %s\n",label);return;}
  printf("GRAPH\t%s\t%s\t%ld\t%ld\t%ld\n",label,g->id,g->n,g->m,p[6]);
  for(v=g->vertices;v<g->vertices+g->n;v++)
    for(a=v->arcs;a;a=a->next)
      printf("ARC\t%ld\t%ld\n",(long)(v-g->vertices),(long)(a->tip-g->vertices));
  puts("END");gb_recycle(g);
}
int main(void) {
  static const char *labels[]={"a","b","c","d","e","f","g","h","i","j","k","l","m","c1","c2","e1","e2","negativeWrap1","negativeWrap2"};
  static const long parameters[][7]={
    {5,0,0,0,-1,0,0},{5,0,0,0,1,0,0},{5,0,0,0,1,1,0},
    {5,0,0,0,-1,0,1},{5,0,0,0,1,0,1},{5,0,0,0,1,1,1},
    {4,5,0,0,1,0,0},{4,5,0,0,1,2,0},{4,5,0,0,1,3,0},
    {4,5,0,0,-1,0,0},{4,5,0,0,1,3,1},{5,0,0,0,2,0,0},
    {2,-5,0,0,1,0,0},{1,0,0,0,1,1,0},{2,0,0,0,1,1,0},
    {1,0,0,0,1,0,1},{2,0,0,0,1,0,1},{1,0,0,0,-1,1,0},{2,0,0,0,-1,1,0}
  };
  unsigned i;
  for(i=0;i<sizeof(labels)/sizeof(labels[0]);i++)emit(labels[i],parameters[i]);
  return 0;
}
